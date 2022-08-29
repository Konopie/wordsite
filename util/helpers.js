var credential = require('credential'),
pw = credential();

module.exports = {
    //change dates into a more user friendly format then the raw data of a date object
    format_date: date => {
        return `${new Date(date).getMonth()+1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`
    },

    //adds an s to whatever string is thrown in based on the amount provided
    format_plural: (word, amount) => {
        if(amount !== 1){
            return `${word}s`
        }else{
            return word;
        }
    },

    //formats urls into just the base url website instead of including all filters and routes
    format_url: (url) => {
        return url.replace('http://', '')
        .replace('https://', '')
        .replace('www.', '')
        .split('/')[0]
        .split('?')[0];
    }, 
     
    //return a promise for when a password will be hashed
    hashPassword: oldPassword => {
        return new Promise((resolve, reject) => {
            pw.hash(oldPassword, function(err, hash) {
            if (err) reject(err)
                resolve(hash)
            });
        })
    },

    //compares the stringified hashing object to the input string to see if they match when unhashed
    checkPassword: (input, hash) => {
        return new Promise((resolve, reject) => {
            pw.verify(hash, input, function(err, isValid){
                var msg;
                if (err) { throw err; }
                msg = isValid ? 'Passwords match!' : 'Wrong password.';
                if(msg === 'Passwords match!'){
                    resolve(true);
                }else{
                    resolve(false);
                }
            })
        })
    }
}