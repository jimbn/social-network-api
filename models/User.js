const { Schema, model } = require('mongoose');

const UserSchema = new Schema ({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref:'Thought',
        }
    ],
    friend: [
        {
            type:Schema.Types.ObjectId,
            ref:'User',
        }
    ]
},
{
    toJson: {
        virtual: true,
    },
    id: false,
},
);

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.export = User;