
exports.index=function(req,res)
{
    var AjaxType = req.param('ajax');
    switch (AjaxType)
    {
        case "add":

            break;
        default:
            res.render('test');
    }

}