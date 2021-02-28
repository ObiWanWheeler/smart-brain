import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());


const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Bill',
            email: 'bill@gmail.com',
            password: 'cookies123',
            entries: 2,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '123',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}



app.get('/', (req, res) => {
    res.json(database.users);
});

app.get('/profile/:id', (req, res) => {
    const id  = req.params.id;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    });
    if (!found) {
        return res.status(404).json('user not found');
    }
    
});

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password) {
        res.json(database.users[0])
    }
    else {
        res.status(400).json('access denied')
    }
});

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
   
    const newUser = {
        id: 111,
        name:name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    };
    database.users.push(newUser);
    
    res.json(newUser);
});

app.put('/image', (req, res) => {
    const id  = req.body.id;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    });
    if (!found) {
        return res.status(404).json('user not found');
    }
})

app.listen(5000, () => {
    console.log('app is running on port 5000');
});