var _=require('lodash') ;
var a=[ { RoomId: '1022,0016,1020',
    Locations: 'http://pavo.elongstatic.com/i/Mobile640_960/00006Z1B.jpg' },
    { RoomId: '1029,1023',
        Locations: 'http://pavo.elongstatic.com/i/Mobile640_960/00008X30.jpg' },
    { RoomId: '0016,1020,1022',
        Locations: 'http://pavo.elongstatic.com/i/Mobile640_960/0000hJOr.jpg' },
    { RoomId: '1027,1025',
        Locations: 'http://pavo.elongstatic.com/i/Mobile640_960/0000hzZr.jpg' },
    { RoomId: '0016,1020,1022',
        Locations: 'http://pavo.elongstatic.com/i/Mobile640_960/0000gWY5.jpg' },
    { RoomId: '0016,1020,1022',
        Locations: 'http://pavo.elongstatic.com/i/Mobile640_960/0000he2p.jpg' },
    { RoomId: '0016,1022',
        Locations: 'http://pavo.elongstatic.com/i/Mobile640_960/00004YY5.jpg' },
    { RoomId: '0016,1020,1022',
        Locations: 'http://pavo.elongstatic.com/i/Mobile640_960/00006Geq.jpg' },
    { RoomId: '0016,1020,1022',
        Locations: 'http://pavo.elongstatic.com/i/Mobile640_960/000070Dl.jpg' },
    { RoomId: '1023,1029',
        Locations: 'http://pavo.elongstatic.com/i/Mobile640_960/0004MQ4l.jpg' },
    { RoomId: '1025,1027',
        Locations: 'http://pavo.elongstatic.com/i/Mobile640_960/0004MRWo.jpg' },
    { RoomId: '1026,0016,1022',
        Locations: 'http://pavo.elongstatic.com/i/Mobile640_960/0004MRWn.jpg' },
    { RoomId: '1023,1029',
        Locations: 'http://pavo.elongstatic.com/i/Mobile640_960/0004MQ3O.jpg' } ] ;
var b=[]
var d=[]
for(var i=0;i<a.length;i++) {

    for(var j=0;j<a[i].RoomId.split(',').length;j++)
    {
        var c={RoomId:a[i].RoomId.split(',')[j],Locations:a[i].Locations}
        if(d.indexOf(c.RoomId)==-1) {
            d.push(c.RoomId);
            b.push(c)
        }

    }

}
//
 console.log(b)
