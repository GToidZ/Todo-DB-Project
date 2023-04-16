export default {
    tasks: {
        baseCase: {
            _id: 0,
            name: "Go shopping",
            pub_date: new Date("2023-01-01T00:00:00Z"),
            priority: 0,
            completed: false,
            tags: []
        },
        higherPriority: {
            _id: 1,
            name: "Clean the living room",
            pub_date: new Date("2023-01-01T00:00:00Z"),
            priority: 1,
            completed: false,
            tags: []
        },
        withDescription: {
            _id: 2,
            name: "Make dinner",
            description: "A mushroom soup with sourdough",
            pub_date: new Date("2023-01-01T00:00:00Z"),
            priority: 0,
            completed: false,
            tags: []
        },
        completed: {
            _id: 3,
            name: "Walk the dog",
            pub_date: new Date("2023-01-01T00:00:00Z"),
            priority: 0,
            completed: true,
            tags: []
        },
        withDueDate: {
            _id: 4,
            name: "Finish the homework",
            pub_date: new Date("2023-01-01T00:00:00Z"),
            priority: 0,
            completed: false,
            reminder: {
                at: new Date("2023-01-05T00:00:00Z")
            },
            tags: []
        },
        withTag: {
            _id: 5,
            name: "Visit my grandma",
            pub_date: new Date("2023-01-01T00:00:00Z"),
            priority: 0,
            completed: false,
            tags: ["Family"]
        }
    },
    tags: {
        baseTag: {
            _id: 0,
            name: "Work",
            priority: 0
        },
        highPriorityTag: {
            _id: 1,
            name: "Family",
            priority: 5
        }
    }
}