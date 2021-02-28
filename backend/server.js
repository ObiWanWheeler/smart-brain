import express from 'express';
import cors from 'cors';
import knex from 'knex';
import bcrypt from 'bcrypt-nodejs';

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'DivineHD1',
      database : 'smartbrain'
    }
});


const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    db.select('*').from('users').then(users => res.json(users));
});

app.get('/profile/:id', (req, res) => {
    const id  = req.params.id;
    db.select('*').from('users').where('id', id).then(user => {
        user.length > 0 ? res.json(user) : res.status(404).json('error retreiving user')
    });
});

app.post('/signin', (req, res) => {
    db.select('email', 'hash').from('login').where('email', '=', req.body.email)
    .then(data => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
        if (isValid) {
            return db.select('*').from('users')
            .where('email', '=', req.body.email)
            .then(user => res.json(user[0]))
            .catch(() => res.status(400).json('unable to signin user'))
        }
        else {
            res.status(400).json('invalid credentials');
        }
    })
    .catch(() => res.status(400).json('invalid credentials'));
});

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    const hashedPass = bcrypt.hashSync(password);
    db.transaction(trx => 
        trx.into('login')
        .insert({
            hash: hashedPass,
            email: email
        })
        .returning('email')
        .then(loginEmail => 
            trx.into('users')
            .insert({
                name: name, 
                email: loginEmail[0], 
                joindate: new Date()
            }).returning('*')
            .then(user => {
                res.json(user[0])
            })
        )
        .then(trx.commit)
        .catch(trx.rollback)
    )
    .catch(err => {console.log(err); res.status(400).json('unable to register');});
});

app.put('/image', (req, res) => {
    const id  = req.body.id;
    db('users').where('id', '=', id).increment('entries', 1).returning('entries')
    .then(entries => {
        entries.length > 0 ? res.json(entries[0]) : res.status(400).json('unable to get entries');
    })
})

app.listen(5000, () => {
    console.log('app is running on port 5000');
});