import express from "express";

export const OOP_MODULES_BACKEND = [
  {
    id: "module-1",
    title: "Module 1 — OOP Basics",
    topics: [
      { id: "oop-1-1", title: "Introduction to OOP", difficulty: "Beginner", articleUrl: "https://www.geeksforgeeks.org/cpp/object-oriented-programming-in-cpp/" },
      { id: "oop-1-2", title: "Procedural vs OOP", difficulty: "Beginner", articleUrl: "https://www.geeksforgeeks.org/software-engineering/differences-between-procedural-and-object-oriented-programming/" },
      { id: "oop-1-3", title: "Classes & Objects", difficulty: "Beginner", articleUrl: "https://www.geeksforgeeks.org/cpp/c-classes-and-objects/" },
      { id: "oop-1-4", title: "Access Specifiers", difficulty: "Beginner", articleUrl: "https://www.geeksforgeeks.org/cpp/access-modifiers-in-c/" }
    ]
  },
  {
    id: "module-2",
    title: "Module 2 — Constructors & Memory",
    topics: [
      { id: "oop-2-1", title: "Constructors & Destructors", difficulty: "Beginner", articleUrl: "https://www.geeksforgeeks.org/cpp/constructors-c/" },
      { id: "oop-2-2", title: "Copy Constructor", difficulty: "Intermediate", articleUrl: "https://www.geeksforgeeks.org/cpp/copy-constructor-in-cpp/" },
      { id: "oop-2-3", title: "Destructors", difficulty: "Intermediate", articleUrl: "https://www.geeksforgeeks.org/cpp/destructors-c/" },
      { id: "oop-2-4", title: "Stack vs Heap Memory", difficulty: "Intermediate", articleUrl: "https://www.geeksforgeeks.org/dsa/stack-vs-heap-memory-allocation/" },
      { id: "oop-2-5", title: "Dynamic Memory Allocation (new & delete)", difficulty: "Intermediate", articleUrl: "https://www.geeksforgeeks.org/cpp/new-and-delete-operators-in-cpp-for-dynamic-memory/" },
      { id: "oop-2-6", title: "this Pointer", difficulty: "Intermediate", articleUrl: "https://www.geeksforgeeks.org/cpp/this-pointer-in-c/" }
    ]
  },
  {
    id: "module-3",
    title: "Module 3 — Encapsulation & Abstraction",
    topics: [
      { id: "oop-3-1", title: "Encapsulation", difficulty: "Beginner", articleUrl: "https://www.geeksforgeeks.org/cpp/encapsulation-in-cpp/" },
      { id: "oop-3-2", title: "Abstraction", difficulty: "Beginner", articleUrl: "https://www.geeksforgeeks.org/cpp/abstraction-in-cpp/" },
      { id: "oop-3-3", title: "Pure Virtual Functions & Abstract Classes", difficulty: "Intermediate", articleUrl: "https://www.geeksforgeeks.org/cpp/pure-virtual-functions-and-abstract-classes/" }
    ]
  },
  {
    id: "module-4",
    title: "Module 4 — Inheritance",
    topics: [
      { id: "oop-4-1", title: "Inheritance Fundamentals", difficulty: "Beginner", articleUrl: "https://www.geeksforgeeks.org/cpp/inheritance-in-c/" },
      { id: "oop-4-2", title: "Types of Inheritance", difficulty: "Intermediate", articleUrl: "https://www.geeksforgeeks.org/cpp/types-of-inheritance-in-cpp/" },
      { id: "oop-4-3", title: "Multiple Inheritance & Diamond Problem", difficulty: "Advanced", articleUrl: "https://www.geeksforgeeks.org/cpp/multiple-inheritance-in-c/" },
      { id: "oop-4-4", title: "Virtual Base Class (Virtual Inheritance)", difficulty: "Advanced", articleUrl: "https://www.geeksforgeeks.org/cpp/virtual-base-class-in-c/" }
    ]
  },
  {
    id: "module-5",
    title: "Module 5 — Polymorphism",
    topics: [
      { id: "oop-5-1", title: "Polymorphism Overview", difficulty: "Intermediate", articleUrl: "https://www.geeksforgeeks.org/cpp/cpp-polymorphism/" },
      { id: "oop-5-2", title: "Function Overloading", difficulty: "Beginner", articleUrl: "https://www.geeksforgeeks.org/cpp/function-overloading-c/" },
      { id: "oop-5-3", title: "Operator Overloading", difficulty: "Advanced", articleUrl: "https://www.geeksforgeeks.org/cpp/operator-overloading-cpp/" },
      { id: "oop-5-4", title: "Function Overriding", difficulty: "Intermediate", articleUrl: "https://www.geeksforgeeks.org/cpp/function-overriding-in-cpp/" },
      { id: "oop-5-5", title: "Virtual Functions", difficulty: "Advanced", articleUrl: "https://www.geeksforgeeks.org/cpp/virtual-function-cpp/" },
      { id: "oop-5-6", title: "Virtual Table (vTable) & Virtual Pointer (vPtr)", difficulty: "Advanced", articleUrl: "https://www.geeksforgeeks.org/cpp/vtable-and-vptr-in-cpp/" }
    ]
  },
  {
    id: "module-6",
    title: "Module 6 — Advanced OOP Concepts",
    topics: [
      { id: "oop-6-1", title: "Friend Class & Friend Function", difficulty: "Intermediate", articleUrl: "https://www.geeksforgeeks.org/cpp/friend-class-function-cpp/" },
      { id: "oop-6-2", title: "Static Members in C++", difficulty: "Intermediate", articleUrl: "https://www.geeksforgeeks.org/cpp/static-keyword-cpp/" },
      { id: "oop-6-3", title: "Static Member Functions", difficulty: "Intermediate", articleUrl: "https://www.geeksforgeeks.org/cpp/static-member-function-in-cpp/" },
      { id: "oop-6-4", title: "const Member Functions", difficulty: "Advanced", articleUrl: "https://www.geeksforgeeks.org/cpp/const-member-functions-c/" },
      { id: "oop-6-5", title: "Object Slicing", difficulty: "Advanced", articleUrl: "https://www.geeksforgeeks.org/cpp/object-slicing-in-c/" },
      { id: "oop-6-6", title: "Shallow Copy vs Deep Copy", difficulty: "Advanced", articleUrl: "https://www.geeksforgeeks.org/cpp/shallow-copy-and-deep-copy-in-c/" },
      { id: "oop-6-7", title: "Rule of Three", difficulty: "Advanced", articleUrl: "https://www.geeksforgeeks.org/cpp/rule-of-three-in-cpp/" },
      { id: "oop-6-8", title: "Rule of Five", difficulty: "Advanced", articleUrl: "https://www.geeksforgeeks.org/cpp/rule-of-five-in-cpp/" },
      { id: "oop-6-9", title: "Move Constructors & Semantics", difficulty: "Advanced", articleUrl: "https://www.geeksforgeeks.org/cpp/move-constructors-in-c-with-examples/" }
    ]
  },
  {
    id: "module-7",
    title: "Module 7 — Object Relationships",
    topics: [
      { id: "oop-7-1", title: "Association, Composition & Aggregation", difficulty: "Intermediate", articleUrl: "https://www.geeksforgeeks.org/java/association-composition-aggregation-java/" },
      { id: "oop-7-2", title: "Association vs Aggregation", difficulty: "Intermediate", articleUrl: "https://www.geeksforgeeks.org/java/difference-between-association-and-aggregation/" }
    ]
  },
  {
    id: "module-8",
    title: "Module 8 — Placement & Design Principles",
    topics: [
      { id: "oop-8-1", title: "SOLID Principles in Software Design", difficulty: "Advanced", articleUrl: "https://www.geeksforgeeks.org/system-design/solid-principle-in-programming-understand-with-real-life-examples/" },
      { id: "oop-8-2", title: "KISS Principle", difficulty: "Beginner", articleUrl: "https://www.geeksforgeeks.org/software-engineering/kiss-principle-in-software-development/" },
      { id: "oop-8-3", title: "Coupling and Cohesion", difficulty: "Intermediate", articleUrl: "https://www.geeksforgeeks.org/software-engineering/software-engineering-coupling-and-cohesion/" },
      { id: "oop-8-4", title: "Object-Oriented Design (OOD)", difficulty: "Intermediate", articleUrl: "https://www.geeksforgeeks.org/system-design/oops-object-oriented-design/" }
    ]
  }
];

const router = express.Router();

router.get("/", (req, res) => {
  res.json(OOP_MODULES_BACKEND);
});

export default router;
