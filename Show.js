

var auxlib = require ('./auxlib');
var Command = require ('./Command');
var exec = require ('child_process').exec;
var gitConfig = require ('./gitConfig');

var Show = (function () {

function Show (argsDict) {
    var argsDict = typeof argsDict === 'undefined' ? {} : argsDict; 
    Command.call (this, argsDict);
    var defaultPropsDict = {
        info: 'Show a list of available decks.'
    };
    auxlib.unpack.apply (this, [argsDict, defaultPropsDict]);
};

Show.prototype = Object.create (Command.prototype);

/**
 * Call the command
 */
Show.prototype.call = function (callback) {
    //console.log ('call');
    var that = this;  
    //exec ('ls ../decks | perl -ne \'s/\\.json//; print $_;\'', 
    exec ('ls ' + gitConfig.workTree + ' | perl -ne \'s/\\.json//; print $_;\'', 
        function (err, stdout, stderr) {

        console.log (stdout);
        Command.prototype.call.call (that, callback);
    });
};

return Show;

}) ();

module.exports = Show;

