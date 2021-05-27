require('dotenv').config();
var mongoose = require('mongoose');
const util = require('util');

const myMongoURI = process.env['MONGO_URI'];

mongoose.connect(
  myMongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

let urlShortSchema = new mongoose.Schema({
  URL: String, // String is shorthand for {type: String}
  short: Number
});

let ShortURL = mongoose.model('ShortURL', urlShortSchema);
console.log(ShortURL);

const createAndSaveShortURL = (newURL,res) => {
  url = newURL['url'];
  if (!isValidURL(url)){
    return res.json({ error: 'invalid url'+'first' })
  }
  
  domain = url.split('/')[2]
  const dns = require('dns');
  const options = {
    family: 4,
  };
  
  dns.lookup(domain, options , (err,  address, family) =>{
    console.log('lookupb', address) ;
    if (typeof address === 'undefined') {
          return res.json({ error: 'invalid url' })
    }
    const count =  ShortURL.countDocuments({})     
    count.then((c)=>{
      console.log('count',c)
      ShortURL.find({ URL: url }, (err, data) => {
      console.log('found',data,data.length)
      let ralph
      if (data.length === 0 ){
        ralph = new ShortURL({
          URL: url,
          short: c++
        });
        ralph.save((err, data) => {
          if (err) return console.log(err);
          console.log('ralph',data)
        });
        res.json({ original_url : url, short_url : c-1});
      } else {
        console.log('the short',data[0].short)
        res.json({ original_url : url, short_url : data[0].short});
      };
      

      console.log('lookupa', address) ;

      
      })
    })

    
  

  });

  
}


 //console.log('still',foo,count);
  

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, data) => {
    if (err) return console.log(err);
    //console.log(data);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId }, (err, data) => {
    if (err) return console.log(err);
    // console.log(data)
    data.favoriteFoods.push(foodToAdd)
    console.log(data)
    // the tricky part here is the namespace
    // notice used new data so as not to confuse with 
    // data var in this scope.
    data.save((err, newdata) => {
      if (err) return console.log(err);
      done(null, newdata);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  console.log(personName)
  Person.findOneAndUpdate({ name: personName }, { $set: { age: ageToSet } }, { new: true }, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });

}
const removeById = (personId, done) => {
  // Person.findOneAndRemove({ _id: personId }, (err, data) => {
  //   if (err) return console.log(err);
  //   done(null, data);
  // });
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });

};

const removeManyPeople = done => {
  const nameToRemove = 'Mary';
  Person.remove({ name: nameToRemove }, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  })


};

const queryChain = done => {
  const foodToSearch = 'burrito';
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select(['name', 'favoriteFoods'])
    .exec((err, data) => {
      if (err) return console.log(err);
      console.log(data)
      done(null, data);
    })




};

  function isValidURL(string) {
  var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
};
/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.ShortURLModel = ShortURL;
exports.createAndSaveShortURL = createAndSaveShortURL;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
