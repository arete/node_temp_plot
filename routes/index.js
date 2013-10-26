
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('flot', { title: 'Cubieboard Domotic:  monitor temp', what: 'Temp', jquery:true, socket:true })
};
