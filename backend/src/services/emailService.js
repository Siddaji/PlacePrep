import nodemailer from "nodemailer";

const createTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });
  }
  return null;
};

/**
 * Sends a verification email containing a verification link.
 * @param {string} email - Recipient email
 * @param {string} rawToken - Unhashed verification token
 */
export const sendVerificationEmail = async (email, rawToken) => {
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  const verifyUrl = `${frontendUrl}/verify-email?token=${rawToken}`;
  const fromEmail = process.env.EMAIL_FROM || '"PlacePrep" <noreply@placeprep.com>';

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; background-color: #0E0E11; border: 1px solid #27272A; border-radius: 12px; padding: 32px; color: #F5F5F5;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px; border-bottom: 1px solid #27272A; padding-bottom: 16px;">
        <div style="width: 36px; height: 36px; background-color: #FFFFFF; color: #000000; border-radius: 8px; font-weight: 800; font-size: 18px; display: flex; align-items: center; justify-content: center; text-align: center; line-height: 36px;">P</div>
        <span style="font-size: 20px; font-weight: 700; color: #FFFFFF;">PlacePrep</span>
      </div>
      
      <h2 style="font-size: 20px; font-weight: 600; color: #FFFFFF; margin-top: 0;">Verify your PlacePrep account</h2>
      <p style="font-size: 14px; color: #A1A1AA; line-height: 1.6;">
        Thank you for signing up for PlacePrep! Please verify your email address to unlock full access to our DSA sheets, Company-wise preparation material, and Core CS revision notes.
      </p>
      
      <div style="margin: 32px 0; text-align: center;">
        <a href="${verifyUrl}" style="background-color: #FFFFFF; color: #000000; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 8px; display: inline-block; font-size: 14px;">
          Verify Email Address
        </a>
      </div>
      
      <p style="font-size: 13px; color: #71717A; line-height: 1.5; margin-bottom: 8px;">
        Or copy and paste this link into your browser:
      </p>
      <p style="font-size: 12px; color: #38BDF8; word-break: break-all; margin-top: 0;">
        <a href="${verifyUrl}" style="color: #38BDF8; text-decoration: underline;">${verifyUrl}</a>
      </p>
      
      <p style="font-size: 12px; color: #52525B; margin-top: 32px; border-top: 1px solid #27272A; padding-top: 16px;">
        If you did not request this email, please ignore it. This link will expire in 30 minutes.
      </p>
    </div>
  `;

  const transporter = createTransporter();

  if (transporter) {
    try {
      await transporter.sendMail({
        from: fromEmail,
        to: email,
        subject: "Verify your PlacePrep account",
        html: htmlContent,
      });
      console.log(`[Email] Verification email sent to ${email}`);
      return true;
    } catch (err) {
      console.error(`[Email] SMTP Error sending verification email:`, err.message);
    }
  }

  // Fallback log for development/testing when SMTP is not active
  console.log(`\n======================================================`);
  console.log(`[DEV MODE - VERIFICATION EMAIL LINK FOR: ${email}]`);
  console.log(`LINK: ${verifyUrl}`);
  console.log(`======================================================\n`);
  return true;
};

/**
 * Sends a password reset email containing a reset link.
 * @param {string} email - Recipient email
 * @param {string} rawToken - Unhashed reset token
 */
export const sendPasswordResetEmail = async (email, rawToken) => {
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  const resetUrl = `${frontendUrl}/reset-password?token=${rawToken}`;
  const fromEmail = process.env.EMAIL_FROM || '"PlacePrep" <noreply@placeprep.com>';

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; background-color: #0E0E11; border: 1px solid #27272A; border-radius: 12px; padding: 32px; color: #F5F5F5;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px; border-bottom: 1px solid #27272A; padding-bottom: 16px;">
        <div style="width: 36px; height: 36px; background-color: #FFFFFF; color: #000000; border-radius: 8px; font-weight: 800; font-size: 18px; display: flex; align-items: center; justify-content: center; text-align: center; line-height: 36px;">P</div>
        <span style="font-size: 20px; font-weight: 700; color: #FFFFFF;">PlacePrep</span>
      </div>
      
      <h2 style="font-size: 20px; font-weight: 600; color: #FFFFFF; margin-top: 0;">Reset your PlacePrep password</h2>
      <p style="font-size: 14px; color: #A1A1AA; line-height: 1.6;">
        You requested a password reset for your PlacePrep account. Click the button below to set a new password.
      </p>
      
      <div style="margin: 32px 0; text-align: center;">
        <a href="${resetUrl}" style="background-color: #FFFFFF; color: #000000; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 8px; display: inline-block; font-size: 14px;">
          Reset Password
        </a>
      </div>
      
      <p style="font-size: 13px; color: #71717A; line-height: 1.5; margin-bottom: 8px;">
        Or copy and paste this link into your browser:
      </p>
      <p style="font-size: 12px; color: #38BDF8; word-break: break-all; margin-top: 0;">
        <a href="${resetUrl}" style="color: #38BDF8; text-decoration: underline;">${resetUrl}</a>
      </p>
      
      <p style="font-size: 12px; color: #52525B; margin-top: 32px; border-top: 1px solid #27272A; padding-top: 16px;">
        If you did not request a password reset, please ignore this email. This link will expire in 30 minutes.
      </p>
    </div>
  `;

  const transporter = createTransporter();

  if (transporter) {
    try {
      await transporter.sendMail({
        from: fromEmail,
        to: email,
        subject: "Reset your PlacePrep password",
        html: htmlContent,
      });
      console.log(`[Email] Password reset email sent to ${email}`);
      return true;
    } catch (err) {
      console.error(`[Email] SMTP Error sending password reset email:`, err.message);
    }
  }

  // Fallback log for development/testing when SMTP is not active
  console.log(`\n======================================================`);
  console.log(`[DEV MODE - PASSWORD RESET LINK FOR: ${email}]`);
  console.log(`LINK: ${resetUrl}`);
  console.log(`======================================================\n`);
  return true;
};
