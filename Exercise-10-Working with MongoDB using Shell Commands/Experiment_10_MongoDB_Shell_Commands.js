
// EXPERIMENT 10
// WORKING WITH MONGODB USING SHELL COMMANDS (mongosh)


// --------------------------------------------------
// 1. DATABASE AND COLLECTION MANAGEMENT
// --------------------------------------------------

// Display all databases
show dbs;

// Switch to universityDB
use universityDB;

// Display current database
db;

// Create students collection
db.createCollection("students");

// Display collections
show collections;


// --------------------------------------------------
// 2. CREATE OPERATIONS (INSERTION)
// --------------------------------------------------

// Insert a single document
db.students.insertOne({
    student_id: 101,
    name: "Alice Smith",
    age: 20,
    major: "Computer Science",
    gpa: 3.8,
    skills: ["Python", "MongoDB"],
    enrollmentDate: new Date("2023-09-01")
});

// Insert multiple documents
db.students.insertMany([
    {
        student_id: 102,
        name: "Bob Jones",
        age: 22,
        major: "Data Science",
        gpa: 3.4,
        skills: ["R", "Python", "SQL"],
        enrollmentDate: new Date("2022-09-01")
    },
    {
        student_id: 103,
        name: "Charlie Brown",
        age: 21,
        major: "Computer Science",
        gpa: 2.8,
        skills: ["Java", "C++"],
        enrollmentDate: new Date("2023-01-15")
    },
    {
        student_id: 104,
        name: "Diana Prince",
        age: 23,
        major: "Cybersecurity",
        gpa: 3.9,
        skills: ["Linux", "Python", "Networking"],
        enrollmentDate: new Date("2021-09-01")
    }
]);


// --------------------------------------------------
// 3. READ OPERATIONS (QUERYING)
// --------------------------------------------------

// Retrieve all documents
db.students.find();

// Find Computer Science students
db.students.find({
    major: "Computer Science"
});

// Find students with GPA >= 3.5
db.students.find({
    gpa: { $gte: 3.5 }
});

// Logical OR and array matching
db.students.find({
    $or: [
        { major: "Cybersecurity" },
        { skills: "MongoDB" }
    ]
});

// Projection: Display selected fields
db.students.find(
    {},
    {
        name: 1,
        gpa: 1,
        major: 1,
        _id: 0
    }
);

// Fetch one student
db.students.findOne({
    student_id: 101
});

// Count Computer Science students
db.students.countDocuments({
    major: "Computer Science"
});


// --------------------------------------------------
// 4. UPDATE OPERATIONS
// --------------------------------------------------

// Update a single document using $set
db.students.updateOne(
    { student_id: 101 },
    {
        $set: {
            gpa: 3.9,
            age: 21
        }
    }
);

// Add Git to Computer Science students using $push
db.students.updateMany(
    { major: "Computer Science" },
    {
        $push: {
            skills: "Git"
        }
    }
);

// Increment age using $inc
db.students.updateOne(
    { student_id: 102 },
    {
        $inc: {
            age: 1
        }
    }
);


// --------------------------------------------------
// 5. INDEXING
// --------------------------------------------------

// Create unique index on student_id
db.students.createIndex(
    { student_id: 1 },
    { unique: true }
);

// Display all indexes
db.students.getIndexes();


// --------------------------------------------------
// 6. DELETE OPERATIONS
// --------------------------------------------------

// Delete one student
db.students.deleteOne({
    student_id: 103
});

// Delete students with GPA below 3.0
db.students.deleteMany({
    gpa: { $lt: 3.0 }
});


// --------------------------------------------------
// OPTIONAL CLEANUP OPERATIONS
// Execute only when required
// --------------------------------------------------

// Drop students collection
// db.students.drop();

// Drop current database
// db.dropDatabase();
