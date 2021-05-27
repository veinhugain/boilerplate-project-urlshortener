require('dotenv').config();
var mongoose = require('mongoose');

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

const createAndSaveShortURL = (newURL) => {
  url = newURL['url'];
  domain = url.split('/')
  //console.log('domain', domain)


  const dns = require('dns');
  const options = {
    family: 4,
  };
  const newAddress = dns.lookup(domain[2], options, (err, address, family) =>{
    //console.log('address: %j family: IPv%s', address, family);
  // address: "2606:2800:220:1:248:1893:25c8:1946" family: IPv6
  return address;
  })

  let count = async function(){
    ccc = await Promise.all( [ShortURL.countDocuments({})])
    return ccc
  }
// async count ()=>  ShortURL.countDocuments({})
// .then(c=>{
//   await c
//   return c
// })
//
let myc =  count().then((c)=>{ c})

console.log('type:',typeof(myc),Object.keys(myc)
)

 console.log('still',newAddress,myc);
  let ralph = new ShortURL({
    URL: url,
    short: 38
  });
  ralph.save((err, data) => {
    if (err) return console.log(err);
    console.log(data)
  });
};

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
