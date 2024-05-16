var express = require('express');
var router = express.Router();

router.get('/', async function (req, res, next) {
  try {
    let wisata = await ModelWisata.getAll();
    res.json(wisata);
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});


router.get('/:id', async function (req, res, next) {
  try {
    let id = req.params.id;
    let wisata = await ModelWisata.getById(id);
    if (wisata) {
      res.json(wisata);
    } else {
      res.status(404).json({ error: 'Data wisata tidak ditemukan' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});

router.post('/', async function (req, res, next) {
  try {
    let data = req.body;
    let result = await ModelWisata.create(data);
    res.json({ id: result });
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});


router.post('/update/(:id)', upload.single("gambar"), async function(req,res,next){
    let id = req.params.id;
    let filebaru = req.file ? req.file.filename : null;
    let rows = await model_wisata.getId(id);
    const namaFileLama = rows[0].gambar;
    
    if(filebaru && namaFileLama){
        const pathFileLama = path.join(__dirname, '../public/images/upload', namaFileLama);
        fs.unlinkSync(pathFileLama);
    }
        let {nama, alamat,deskripsi, } = req.body;
        let gambar = filebaru || namaFileLama;
        let Data = {
            nama,
            alamat,
            deskripsi,
            gambar,
        }
        model_wisata.update(id,Data);
        req.flash('success','Berhasil update data');
        res.redirect('/wisata')
    })


router.get('/delete/(:id)',async function(req,res,next){
    let id = req.params.id;
    let rows = await model_wisata.getId(id);
    const namaFileLama = rows[0].gambar;
    if(namaFileLama){
        const pathFileLama = path.join(__dirname, '../public/images/upload', namaFileLama);
        fs.unlinkSync(pathFileLama);
    }
    await model_wisata.delete(id);
    req.flash('success','Berhasil menghapus data');
    res.redirect('/wisata')
});

module.exports = router;