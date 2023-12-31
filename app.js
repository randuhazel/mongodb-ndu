const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const { body, validationResult, check } = require('express-validator')
const methodOverride = require('method-override')

const session = require('express-session');
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

require('./utils/db')
const Contact = require('./model/contact')

const app = express()
const port = 3000;

app.use(methodOverride('_method'))

app.set('view engine', 'ejs');
app.use(expressLayouts); 
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));

app.use(cookieParser('secret'));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
)
app.use(flash())

app.get('/', (req, res) => {
    // res.sendFile('./index.html', {root: __dirname});
    const mahasiswa = [
      {
        nama: 'RanduHazel',
        email: 'randu.hazel.4a@gmail.com',
      },
  
      {
        nama: 'TiyasRamadhan',
        email: 'tyasramadhan05@gmail.com',
      },
      
      {
        nama: 'RamdanSubarjah',
        email: 'Subarjah123@gmail.com',
      },
    ];
    res.render('index', { 
      nama: 'Randu Hazel Harvani', 
      title: 'Halaman Home',
      mahasiswa,
      layout: 'layouts/main-layout'
     });
  });

  app.get('/about', (req, res, next) => {
    res.render('about', {
      layout: 'layouts/main-layout',
      title: 'Halaman About'
    });
    next();
  })

  app.get('/contact', async (req, res) => {
    const contacts = await Contact.find();
    
    res.render('contact', {
      layout: 'layouts/main-layout',
      title: 'Halaman Contact',
      contacts,
      msg: req.flash('msg')
    });
  })

  //halaman form tambah data contact
app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    title: 'Form tambah data contact',
    layout: 'layouts/main-layout',
  })
})

  //prosess tambah data contact
app.post('/contact', [
  body('nama').custom( async (value) => {
    const duplikat = await Contact.findOne({nama: value});
    if(duplikat) {
      throw new Error('Nama contact sudah digunakan!');
    }
    return true;
  }),
  check('email', 'Email tidak valid!').isEmail(),
  check('nohp', 'No HP tidak valid!!').isMobilePhone('id-ID')
  ], (req, res) => {
   const errors = validationResult(req);
   if(!errors.isEmpty()) {
   res.render('add-contact', {
    title: 'Form Tambah Data Contact',
    layout: 'layouts/main-layout',
    errors: errors.array(),
   })
  } else {
    Contact.insertMany(req.body, (error, result) => {
        //kirimkan flash message
    req.flash('msg', 'Data Contact Berhasil Ditambahkan!')
    res.redirect('/contact')
    })
   }
 }
)

app.delete('/contact', (req, res) => {
  Contact.deleteOne({nama: req.body.nama}).then((result) => {
          req.flash('msg', 'Data Contact Berhasil DiHapusss!')
          res.redirect('/contact')
        });
 })

 app.get('/contact/edit/:nama', async (req, res) => {
  const contact = await Contact.findOne({nama: req.params.nama});

  res.render('edit-contact', {
    title: 'Form tambah data contact',
    layout: 'layouts/main-layout',
    contact, 
  })
})

//prosses ubah data
app.put('/contact', [
  body('nama').custom(async (value, {req}) => {
    const duplikat = await Contact.findOne({nama: value});
    if(value !== req.body.oldNama && duplikat) {
      throw new Error('Nama contact sudah digunakan!');
    }
    return true;
  }),
  check('email', 'Email tidak valid!').isEmail(),
  check('nohp', 'No HP tidak valid!!').isMobilePhone('id-ID')
  ], (req, res) => {
   const errors = validationResult(req);
   if(!errors.isEmpty()) {
   res.render('edit-contact', {
    title: 'Form Ubah Data Contact',
    layout: 'layouts/main-layout',
    errors: errors.array(),
    contact: req.body
   })
  } else {
    Contact.updateOne(
      { _id: req.body._id},
      {
        $set: {
          nama: req.body.nama,
          email: req.body.email,
          nohp: req.body.nohp, 
        }
      } 
      ).then((result) => {
        //kirimkan flash message
       req.flash('msg', 'Data Contact Berhasil DiUbahhhh!')
       res.redirect('/contact')
      })
   }
 }
)

  //halaman detail contact
app.get('/contact/:nama', async (req, res) => {
  const contact = await Contact.findOne({nama: req.params.nama});
  
  res.render('detail', {
    layout: 'layouts/main-layout',
    title: 'Halaman Detail Contact',
    contact,
  });
})
  
app.listen(port, () => {
    console.log(`Mongo Contact App | listening at http://localhost:${port}`);
  })