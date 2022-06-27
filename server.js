// models
    // user -> username, email, thoughts (arry of ids linking to thought model), friends (arry of id self-referencing user model) + virtual tracking friendCount
    // thought -> thoughtText, createdAt, username (that created this thought), reactions (nested documents using reaction Schema) + virtual for reactionCount

    // SCHEMA ONLY
        // reactionId, reactionBody, username, createdAt used as the raction field's subdocument schema in thought model
// server.js needs to run express and mongodb
// api routes
    // /api/users -> GET all users, GET a single user by id, POST a new user, PUT a user by id, DELETE a user by ID - BONUS remove a user's associated thoughts when deleted
    // /api/users/:userId/friends/:friendID -> POST to add a new friend to a user's friend list, DELETE to remove a friend from a user's friend list
    // /api/thoughts -> GET to get all thoughts, GET to get a single thought by its id, POST to create a new thought
    // /api/thoughts/:thoughtID/reactions -> POST to create a reaction, DELETE to pull and remove a reaction
// api controllers