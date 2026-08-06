const systemDesignTopics = [
  {
    id: 1,
    title: "Design a Rate Limiter",
    category: "HLD",
    subcategory: "API Gateway",
    difficulty: "Intermediate",
    companies: ["ByteDance", "Coinbase", "Stripe", "Uber"],
    summary: "Design an API Rate Limiter to prevent abuse, mitigate DDoS attacks, and enforce quota limits across microservices.",
    videos: [
      {
        title: "System Design: How to design a Rate Limiter",
        url: "https://www.youtube.com/watch?v=FU4WlwfS3G0"
      },
      {
        title: "Rate Limiter System Design in Hindi | API Gateway & Algorithms",
        url: "https://youtu.be/CVItTb_jdkE?si=S-gc7I7M7NxmEtPg"
      }
    ]
  },
  {
    id: 2,
    title: "Design TinyURL",
    category: "HLD",
    subcategory: "Case Study",
    difficulty: "Intermediate",
    companies: ["Amazon", "Google", "Microsoft", "Meta"],
    summary: "Design a service like bit.ly that converts long URLs to short codes and redirects users correctly at scale.",
    videos: [
      {
        title: "System Design: Design TinyURL or URL Shortener",
        language: "English",
        url: "https://youtu.be/fMZMm_0ZhK4?si=FNorm5i0TbpFkDPY"
      },
      {
        title: "TinyURL System Design in Hindi | System Design Course",
        language: "Hindi",
        url: "https://youtu.be/9csfoQK2T8g?si=UJSbaat1tD5fJnpY"
      },
      {
        title: "TinyURL System Design in Hindi | System Design Course",
        language: "Hindi",
        url: "https://youtu.be/Y-BO_4XNw8c?si=3rWWzuUqp71xaW1N"
      }
    ]
  },
  {
    id: 3,
    title: "Design Twitter",
    category: "HLD",
    subcategory: "Feed Architecture",
    difficulty: "Advanced",
    companies: ["Meta", "Twitter/X", "Uber", "Netflix"],
    summary: "Design the system that generates and displays a user's Twitter home timeline — fan-out on write vs fan-out on read.",
    videos: [
      {
        title: "System Design: Design Twitter Home Timeline",
        language: "English",
        url: "https://youtu.be/Nfa-uUHuFHg?si=vHyWrMWQsGQI44FV"
      },
      {
        title: "Twitter System Design in Hindi | Feed Architecture & Fanout",
        language: "Hindi",
        url: "https://youtu.be/Fy_Vo45P9xM?si=EwfUoMO18l4wVmb_"
      }
    ]
  },
  {
    id: 4,
    title: "Design YouTube",
    category: "HLD",
    subcategory: "Video Streaming & Storage",
    difficulty: "Advanced",
    companies: ["Google", "Netflix", "Amazon", "Meta"],
    summary: "Design a scalable video streaming platform like YouTube or Netflix, focusing on video chunking, transcoding, and CDN distribution.",
    videos: [
      {
        title: "System Design: Design YouTube Video Streaming Service",
        language: "English",
        url: "https://youtu.be/jPKTo1iGQiE?si=WZ1ro7JaO20MV0ef"
      },
      {
        title: "YouTube System Design in Hindi | Video Upload & CDN Streaming",
        language: "Hindi",
        url: "https://youtu.be/xx0nGuX42Lk?si=v4HSBlgSsMdzisoK"
      }
    ]
  },
  {
    id: 5,
    title: "Design Google Drive",
    category: "HLD",
    subcategory: "Distributed Storage",
    difficulty: "Advanced",
    companies: ["Google", "Dropbox", "Microsoft", "Box"],
    summary: "Design a cloud file storage and synchronization service like Google Drive or Dropbox with block-level syncing.",
    videos: [
      {
        title: "System Design: Design Google Drive / Dropbox",
        language: "English",
        url: "https://www.youtube.com/watch?v=U0xTu6E2CT8"
      },
      {
        title: "Google Drive System Design in Hindi | Block Storage & Sync",
        language: "Hindi",
        url: "https://youtu.be/_Nh8iQ_D43o?si=L2ZIY0xY99D-QKcH"
      },
      {
        title: "Google Drive System Design in Hindi | Block Storage & Sync",
        language: "Hindi",
        url: "https://youtu.be/Dnp_-xZjNRo?si=TZ5SilEawjbmqAfj"
      }
    ]
  },
  {
    id: 6,
    title: "Scalability & Load Balancing",
    category: "HLD",
    subcategory: "Fundamentals",
    difficulty: "Beginner",
    companies: ["Google", "Netflix", "Amazon", "Meta"],
    summary: "Master horizontal vs vertical scaling, L4 vs L7 load balancing algorithms, and sticky sessions.",
    videos: [
      {
        title: "System Design Basics: Load Balancing & Scalability",
        language: "English",
        url: "https://youtu.be/xpDnVSmNFX0?si=Qr7-JZqEIdVCHtrF"
      },
      {
        title: "Load Balancing & Horizontal Scaling Explained in Hindi",
        language: "Hindi",
        url: "https://youtu.be/TXJP0gzCXFQ?si=keNG7bRFRQp1NLNp"
      }
    ]
  },
  {
    id: 7,
    title: "Caching — Redis & CDN",
    category: "HLD",
    subcategory: "Fundamentals",
    difficulty: "Intermediate",
    companies: ["Netflix", "Twitter/X", "Airbnb", "Google"],
    summary: "Deep dive into caching strategies (Cache-Aside, Write-Through), eviction policies (LRU, LFU), and Redis clusters.",
    videos: [
      {
        title: "System Design Basics: Caching, Redis & Content Delivery Networks (CDN)",
        language: "English",
        url: "https://www.youtube.com/watch?v=iuqZvajTOyA"
      },
      {
        title: "Redis Caching & CDN Strategy System Design in Hindi",
        language: "Hindi",
        url: "https://www.youtube.com/watch?v=O15e6S02p6I"
      }
    ]
  },
  {
    id: 8,
    title: "Databases — SQL vs NoSQL",
    category: "HLD",
    subcategory: "Fundamentals",
    difficulty: "Intermediate",
    companies: ["Instagram", "Uber", "LinkedIn", "Amazon"],
    summary: "Understand when to choose relational databases (PostgreSQL, MySQL) vs NoSQL document/key-value stores (MongoDB, Cassandra, DynamoDB).",
    videos: [
      {
        title: "SQL vs NoSQL Databases: How to Choose for System Design",
        language: "English",
        url: "https://www.youtube.com/watch?v=z0S1_-T_a0A"
      },
      {
        title: "SQL vs NoSQL System Design Explained in Hindi",
        language: "Hindi",
        url: "https://www.youtube.com/watch?v=v3M8sTqP31c"
      }
    ]
  },
  {
    id: 9,
    title: "CAP Theorem & PACELC",
    category: "HLD",
    subcategory: "Distributed Systems",
    difficulty: "Intermediate",
    companies: ["Google", "Amazon", "Microsoft", "Uber"],
    summary: "Master Consistency, Availability, and Partition Tolerance in distributed database systems.",
    videos: [
      {
        title: "CAP Theorem & PACELC Theorem Explained in Distributed Systems",
        language: "English",
        url: "https://www.youtube.com/watch?v=k-Yaq8AHlBU"
      },
      {
        title: "CAP Theorem System Design Concept in Hindi",
        language: "Hindi",
        url: "https://www.youtube.com/watch?v=BHw3-X-X33s"
      }
    ]
  },
  {
    id: 10,
    title: "Message Queues & Kafka",
    category: "HLD",
    subcategory: "Messaging",
    difficulty: "Intermediate",
    companies: ["LinkedIn", "Uber", "Netflix", "PayPal"],
    summary: "Asynchronous processing, message broker patterns, publish-subscribe queues, and Apache Kafka architecture.",
    videos: [
      {
        title: "System Design: Message Queues & Apache Kafka Architecture",
        language: "English",
        url: "https://www.youtube.com/watch?v=G4IttPzC1qA"
      },
      {
        title: "Message Queues & Kafka System Design in Hindi",
        language: "Hindi",
        url: "https://www.youtube.com/watch?v=R873BlNVUB4"
      }
    ]
  },
  {
    id: 11,
    title: "Microservices Architecture",
    category: "LLD",
    subcategory: "Fundamentals",
    difficulty: "Intermediate",
    companies: ["Amazon", "Netflix", "Uber", "DoorDash"],
    summary: "Decomposing monoliths, API gateway routing, service discovery, distributed tracing, and fault tolerance.",
    videos: [
      {
        title: "Microservices Architecture & Monolith vs Microservices",
        language: "English",
        url: "https://www.youtube.com/watch?v=rv4LlmLmVWk"
      },
      {
        title: "Microservices System Design in Hindi | Low-Level & High-Level Architecture",
        language: "Hindi",
        url: "https://www.youtube.com/watch?v=1xDEde9T7bM"
      }
    ]
  },
  {
    id: 12,
    title: "Consistent Hashing",
    category: "LLD",
    subcategory: "Fundamentals",
    difficulty: "Intermediate",
    companies: ["Amazon", "Discord", "Akamai", "Google"],
    summary: "Distributed hash rings, virtual nodes, and efficient data partitioning across dynamic server clusters.",
    videos: [
      {
        title: "System Design: Consistent Hashing Distributed Systems",
        language: "English",
        url: "https://www.youtube.com/watch?v=zaRkONvyl8s"
      },
      {
        title: "Consistent Hashing Algorithm System Design in Hindi",
        language: "Hindi",
        url: "https://www.youtube.com/watch?v=UF9Iq6y1G3I"
      }
    ]
  }
];

export default systemDesignTopics;
