// global helper functions

let helpers = {

    lowerCase: function(string) {
        if (string) {
            return string.toLowerCase();
        }
    },

    /**
     * Adds "fucking" in various places within a phrase, depending on the phrase
     *
     * @method fucktify
     * @return {string} unsanitized phrase
     */
    fucktify: function(str) {
        if (str === undefined) {
            str = "Some fucking building";
        } else {
            // I need to standardize the character case because
            // the data is chaos and indexOf uses strict equality
            var str_arr = String(str).toLowerCase().trim().split(" ");
            // assuming two or more words...
            if (str_arr.length >= 2) {
                // ...check for the existence/index of "of"...
                var of_idx = str_arr.indexOf("of");
                if (of_idx > -1) {
                    // ...insert after "of" for great justice...
                    str_arr.splice(of_idx + 1, 0, "fucking");
                } else {
                    // ...or just stick "fucking" between the 1st and 2nd words
                    str_arr.splice(1, 0, "fucking");
                }
            } else {
                // else, start the word with "fucking"
                str_arr.splice(0, 0, "fucking");
            }
            // put that shit back together
            str = str_arr.join(" ");
        }
        return str;
    },

    /**
     * Titlecases a string. So HI EVERYONE becomes "Hi Everyone"
     *
     * @method titlecase
     * @return {string} titlecased string
     */
    titlecase: function(str) {
        var words = str.toLowerCase().split(' ');
        for (var i = 0; i < words.length; i++) {
            var letters = words[i].split('');
            letters[0] = letters[0].toUpperCase();
            words[i] = letters.join('');
        }
        return words.join(' ');
    },

    /**
     * Randomly shuffles an array
     *
     * @method shuffle
     * @return {array} randomized array
     */
    shuffle: function(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
}

export default helpers;
