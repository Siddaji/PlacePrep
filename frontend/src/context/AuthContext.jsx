import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authService } from "../services/authService.js";
import { progressService } from "../services/progressService.js";

const AuthContext = createContext(null);

const MIGRATION_FLAG_KEY = "placeprep_migrated_v1";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("placeprep_auth_token"));
  const [loading, setLoading] = useState(true);

  // Synchronize local storage with cloud progress and merge un-synced items
  const syncUserProgressWithCloud = useCallback(async (userId) => {
    try {
      const userMigrationKey = `${MIGRATION_FLAG_KEY}_${userId}`;
      const hasMigrated = localStorage.getItem(userMigrationKey) === "true";

      if (!hasMigrated) {
        const localItemsToSync = [];

        // 1. DSA
        try {
          const dsa = JSON.parse(localStorage.getItem("placeprep-solved") || "[]");
          if (Array.isArray(dsa)) {
            dsa.forEach((id) => localItemsToSync.push({ resourceType: "dsa", resourceId: String(id) }));
          }
        } catch {}

        // 2. Company DSA
        try {
          const comp = JSON.parse(localStorage.getItem("placeprep-company-problems-solved") || "[]");
          if (Array.isArray(comp)) {
            comp.forEach((id) => localItemsToSync.push({ resourceType: "company-dsa", resourceId: String(id) }));
          }
        } catch {}

        // 3. System Design
        try {
          const sd = JSON.parse(localStorage.getItem("placeprep-sd-studied") || "[]");
          if (Array.isArray(sd)) {
            sd.forEach((id) => localItemsToSync.push({ resourceType: "system-design", resourceId: String(id) }));
          }
        } catch {}

        // 4. OS
        try {
          const os = JSON.parse(localStorage.getItem("placeprep-os-solved-topics") || "[]");
          if (Array.isArray(os)) {
            os.forEach((id) => localItemsToSync.push({ resourceType: "os", resourceId: String(id) }));
          }
        } catch {}

        // 5. OOP
        try {
          const oop = JSON.parse(localStorage.getItem("placeprep-oop-solved-topics") || "[]");
          if (Array.isArray(oop)) {
            oop.forEach((id) => localItemsToSync.push({ resourceType: "oop", resourceId: String(id) }));
          }
        } catch {}

        // 6. Subjects
        try {
          const sub = JSON.parse(localStorage.getItem("placeprep-subjects-studied") || "[]");
          if (Array.isArray(sub)) {
            sub.forEach((id) => localItemsToSync.push({ resourceType: "subjects", resourceId: String(id) }));
          }
        } catch {}

        if (localItemsToSync.length > 0) {
          await progressService.bulkSync(localItemsToSync);
        }
        localStorage.setItem(userMigrationKey, "true");
        localStorage.setItem(MIGRATION_FLAG_KEY, "true");
      }

      // Fetch cloud progress as source of truth and update local caches
      const cloudRes = await progressService.getAllProgress();
      if (cloudRes && cloudRes.success && cloudRes.progress) {
        const p = cloudRes.progress;
        if (Array.isArray(p.dsa)) {
          localStorage.setItem("placeprep-solved", JSON.stringify(p.dsa.map((id) => Number(id) || id)));
        }
        if (Array.isArray(p["company-dsa"])) {
          localStorage.setItem("placeprep-company-problems-solved", JSON.stringify(p["company-dsa"].map((id) => Number(id) || id)));
        }
        if (Array.isArray(p["system-design"])) {
          localStorage.setItem("placeprep-sd-studied", JSON.stringify(p["system-design"].map((id) => Number(id) || id)));
        }
        if (Array.isArray(p.os)) {
          localStorage.setItem("placeprep-os-solved-topics", JSON.stringify(p.os));
        }
        if (Array.isArray(p.oop)) {
          localStorage.setItem("placeprep-oop-solved-topics", JSON.stringify(p.oop));
        }
        if (Array.isArray(p.subjects)) {
          localStorage.setItem("placeprep-subjects-studied", JSON.stringify(p.subjects));
        }

        // Notify active pages of updated cloud progress
        window.dispatchEvent(new CustomEvent("placeprep-progress-updated", { detail: p }));
      }
    } catch (error) {
      console.error("Failed to sync progress with cloud:", error);
    }
  }, []);

  useEffect(() => {
    async function initAuth() {
      if (token) {
        try {
          const res = await authService.getMe(token);
          if (res.success && res.user) {
            setUser(res.user);
            await syncUserProgressWithCloud(res.user._id);
          } else {
            // Token invalid or expired
            localStorage.removeItem("placeprep_auth_token");
            setToken(null);
            setUser(null);
          }
        } catch (error) {
          console.error("Auth init error:", error);
          localStorage.removeItem("placeprep_auth_token");
          setToken(null);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    }

    initAuth();
  }, [token, syncUserProgressWithCloud]);

  const login = async (authToken, userData) => {
    localStorage.setItem("placeprep_auth_token", authToken);
    setToken(authToken);
    setUser(userData);
    if (userData && userData._id) {
      await syncUserProgressWithCloud(userData._id);
    }
  };

  const logout = () => {
    localStorage.removeItem("placeprep_auth_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        syncProgress: () => user && user._id && syncUserProgressWithCloud(user._id),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
