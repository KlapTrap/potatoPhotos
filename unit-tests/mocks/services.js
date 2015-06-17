"use strict";

describe("flickr api service", function () {
    var FlickrPhotoService, PotatoPhotosService, httpBackend;

    beforeEach(module("potatoPhotosApp"));

    beforeEach(inject(function (paFlickrPhotoService, poPotatoPhotosService, $httpBackend) {
        FlickrPhotoService = paFlickrPhotoService;
        PotatoPhotosService = poPotatoPhotosService;
        httpBackend = $httpBackend;
    }));

    it("get photo", function () {
        httpBackend.whenJSONP('https://api.flickr.com/services/rest/?api_key=503a3ba265e96c811cac7e7bb7489e20&format=json&jsoncallback=JSON_CALLBACK&method=flickr.photos.getInfo').respond(
            {
                "photo": {
                    "id": "18663435860",
                    "secret": "d4a7e8a864",
                    "server": "5529",
                    "farm": 6,
                    "dateuploaded": "1434432126",
                    "isfavorite": 0,
                    "license": "0",
                    "safety_level": "0",
                    "rotation": 0,
                    "originalsecret": "096439bed4",
                    "originalformat": "jpg",
                    "owner": {
                        "nsid": "95631287@N06",
                        "username": "Hungry Peepor",
                        "realname": "",
                        "location": "Singapore, Singapore",
                        "iconserver": "7287",
                        "iconfarm": 8,
                        "path_alias": "hungrypeepor"
                    },
                    "title": {
                        "_content": "Potato Salad"
                    },
                    "description": {
                        "_content": "Home-made potato salad with eggs, apples and celery"
                    },
                    "visibility": {
                        "ispublic": 1,
                        "isfriend": 0,
                        "isfamily": 0
                    },
                    "dates": {
                        "posted": "1434432126",
                        "taken": "2015-05-16 08:00:32",
                        "takengranularity": "0",
                        "takenunknown": "0",
                        "lastupdate": "1434432234"
                    },
                    "views": "0",
                    "editability": {
                        "cancomment": 0,
                        "canaddmeta": 0
                    },
                    "publiceditability": {
                        "cancomment": 1,
                        "canaddmeta": 0
                    },
                    "usage": {
                        "candownload": 1,
                        "canblog": 0,
                        "canprint": 0,
                        "canshare": 1
                    },
                    "comments": {
                        "_content": "0"
                    },
                    "notes": {
                        "note": []
                    },
                    "people": {
                        "haspeople": 0
                    },
                    "tags": {
                        "tag": [
                            {
                                "id": "95585965-18663435860-12565",
                                "author": "95631287@N06",
                                "authorname": "Hungry Peepor",
                                "raw": "Potato",
                                "_content": "potato",
                                "machine_tag": 0
                            },
                            {
                                "id": "95585965-18663435860-2484",
                                "author": "95631287@N06",
                                "authorname": "Hungry Peepor",
                                "raw": "Salad",
                                "_content": "salad",
                                "machine_tag": 0
                            },
                            {
                                "id": "95585965-18663435860-6804",
                                "author": "95631287@N06",
                                "authorname": "Hungry Peepor",
                                "raw": "Egg",
                                "_content": "egg",
                                "machine_tag": 0
                            },
                            {
                                "id": "95585965-18663435860-115287",
                                "author": "95631287@N06",
                                "authorname": "Hungry Peepor",
                                "raw": "Chilled",
                                "_content": "chilled",
                                "machine_tag": 0
                            },
                            {
                                "id": "95585965-18663435860-70877",
                                "author": "95631287@N06",
                                "authorname": "Hungry Peepor",
                                "raw": "Mayonnaise",
                                "_content": "mayonnaise",
                                "machine_tag": 0
                            },
                            {
                                "id": "95585965-18663435860-747",
                                "author": "95631287@N06",
                                "authorname": "Hungry Peepor",
                                "raw": "Apple",
                                "_content": "apple",
                                "machine_tag": 0
                            },
                            {
                                "id": "95585965-18663435860-16714",
                                "author": "95631287@N06",
                                "authorname": "Hungry Peepor",
                                "raw": "Western",
                                "_content": "western",
                                "machine_tag": 0
                            }
                        ]
                    },
                    "urls": {
                        "url": [
                            {
                                "type": "photopage",
                                "_content": "https:\/\/www.flickr.com\/photos\/hungrypeepor\/18663435860\/"
                            }
                        ]
                    },
                    "media": "photo"
                },
                "stat": "ok"
            }
        );

        FlickrPhotoService.getPhoto().then(function (photo) {
            expect(photo.id).toEqual('18663435860');
        });
        httpBackend.flush();
    });

    it("get potato photos", function () {
        httpBackend.whenJSONP('https://api.flickr.com/services/rest/?api_key=503a3ba265e96c811cac7e7bb7489e20&extras=owner_name,date_upload,url_m&format=json&jsoncallback=JSON_CALLBACK&method=flickr.photos.search&per_page=20&tagMode=all&tags=potato').respond(
            {
                "photos": {
                    "page": 1,
                    "pages": 4812,
                    "perpage": 20,
                    "total": "96234",
                    "photo": [
                        {
                            "id": "18860887926",
                            "owner": "60699058@N04",
                            "secret": "006cc6ac55",
                            "server": "5589",
                            "farm": 6,
                            "title": "New potato with sausages and courgette cooked",
                            "ispublic": 1,
                            "isfriend": 0,
                            "isfamily": 0,
                            "dateupload": "1434537438",
                            "ownername": "manyakotic",
                            "url_m": "https://farm6.staticflickr.com/5589/18860887926_006cc6ac55.jpg",
                            "height_m": "500",
                            "width_m": "333"
                        },
                        {
                            "id": "18266499023",
                            "owner": "60699058@N04",
                            "secret": "d2517e923b",
                            "server": "369",
                            "farm": 1,
                            "title": "New potato with sausages and courgette cooked",
                            "ispublic": 1,
                            "isfriend": 0,
                            "isfamily": 0,
                            "dateupload": "1434537439",
                            "ownername": "manyakotic",
                            "url_m": "https://farm1.staticflickr.com/369/18266499023_d2517e923b.jpg",
                            "height_m": "500",
                            "width_m": "333"
                        },
                        {
                            "id": "18689432308",
                            "owner": "67387943@N02",
                            "secret": "3137f26733",
                            "server": "3780",
                            "farm": 4,
                            "title": "Lema Daturaphila, Mating Three-lined Potato Beetles 1",
                            "ispublic": 1,
                            "isfriend": 0,
                            "isfamily": 0,
                            "dateupload": "1434506630",
                            "ownername": "DarkOnus",
                            "url_m": "https://farm4.staticflickr.com/3780/18689432308_3137f26733.jpg",
                            "height_m": "457",
                            "width_m": "500"
                        },
                        {
                            "id": "18256510553",
                            "owner": "67387943@N02",
                            "secret": "ac0f508b7c",
                            "server": "5347",
                            "farm": 6,
                            "title": "Lema Daturaphila, Mating Three-lined Potato Beetles 2",
                            "ispublic": 1,
                            "isfriend": 0,
                            "isfamily": 0,
                            "dateupload": "1434506631",
                            "ownername": "DarkOnus",
                            "url_m": "https://farm6.staticflickr.com/5347/18256510553_ac0f508b7c.jpg",
                            "height_m": "461",
                            "width_m": "500"
                        },
                        {
                            "id": "18871535082",
                            "owner": "67387943@N02",
                            "secret": "4e94852692",
                            "server": "3844",
                            "farm": 4,
                            "title": "Lema Daturaphila, Mating Three-lined Potato Beetles 1 - Parallel 3D",
                            "ispublic": 1,
                            "isfriend": 0,
                            "isfamily": 0,
                            "dateupload": "1434505944",
                            "ownername": "DarkOnus",
                            "url_m": "https://farm4.staticflickr.com/3844/18871535082_4e94852692.jpg",
                            "height_m": "225",
                            "width_m": "500"
                        },
                        {
                            "id": "18254178474",
                            "owner": "67387943@N02",
                            "secret": "58a836812e",
                            "server": "5524",
                            "farm": 6,
                            "title": "Lema Daturaphila, Mating Three-lined Potato Beetles 1 - Cross-eye 3D",
                            "ispublic": 1,
                            "isfriend": 0,
                            "isfamily": 0,
                            "dateupload": "1434505944",
                            "ownername": "DarkOnus",
                            "url_m": "https://farm6.staticflickr.com/5524/18254178474_58a836812e.jpg",
                            "height_m": "225",
                            "width_m": "500"
                        },
                        {
                            "id": "18254165794",
                            "owner": "67387943@N02",
                            "secret": "1f247b7c3b",
                            "server": "5465",
                            "farm": 6,
                            "title": "Lema Daturaphila, Mating Three-lined Potato Beetles 1 - Anaglyph 3D",
                            "ispublic": 1,
                            "isfriend": 0,
                            "isfamily": 0,
                            "dateupload": "1434505945",
                            "ownername": "DarkOnus",
                            "url_m": "https://farm6.staticflickr.com/5465/18254165794_1f247b7c3b.jpg",
                            "height_m": "455",
                            "width_m": "500"
                        },
                        {
                            "id": "18254165394",
                            "owner": "67387943@N02",
                            "secret": "c31d70da1b",
                            "server": "5504",
                            "farm": 6,
                            "title": "Lema Daturaphila, Mating Three-lined Potato Beetles 2 - Crosseye 3D",
                            "ispublic": 1,
                            "isfriend": 0,
                            "isfamily": 0,
                            "dateupload": "1434505946",
                            "ownername": "DarkOnus",
                            "url_m": "https://farm6.staticflickr.com/5504/18254165394_c31d70da1b.jpg",
                            "height_m": "229",
                            "width_m": "500"
                        },
                        {
                            "id": "18688989188",
                            "owner": "67387943@N02",
                            "secret": "298d03450c",
                            "server": "5339",
                            "farm": 6,
                            "title": "Lema Daturaphila, Mating Three-lined Potato Beetles 2 - Parallel 3D",
                            "ispublic": 1,
                            "isfriend": 0,
                            "isfamily": 0,
                            "dateupload": "1434505946",
                            "ownername": "DarkOnus",
                            "url_m": "https://farm6.staticflickr.com/5339/18688989188_298d03450c.jpg",
                            "height_m": "229",
                            "width_m": "500"
                        },
                        {
                            "id": "18254163954",
                            "owner": "67387943@N02",
                            "secret": "26e44d892d",
                            "server": "3878",
                            "farm": 4,
                            "title": "Lema Daturaphila, Mating Three-lined Potato Beetles 2 - Anaglyph 3D",
                            "ispublic": 1,
                            "isfriend": 0,
                            "isfamily": 0,
                            "dateupload": "1434505947",
                            "ownername": "DarkOnus",
                            "url_m": "https://farm4.staticflickr.com/3878/18254163954_26e44d892d.jpg",
                            "height_m": "459",
                            "width_m": "500"
                        },
                        {
                            "id": "18252879264",
                            "owner": "17785846@N00",
                            "secret": "a35fb004a6",
                            "server": "5493",
                            "farm": 6,
                            "title": "Kidney potato",
                            "ispublic": 1,
                            "isfriend": 0,
                            "isfamily": 0,
                            "dateupload": "1434501762",
                            "ownername": "drsamanta",
                            "url_m": "https://farm6.staticflickr.com/5493/18252879264_a35fb004a6.jpg",
                            "height_m": "281",
                            "width_m": "500"
                        },
                        {
                            "id": "18243244543",
                            "owner": "50803279@N03",
                            "secret": "a30a7189bf",
                            "server": "5548",
                            "farm": 6,
                            "title": "IMG_1566",
                            "ispublic": 1,
                            "isfriend": 0,
                            "isfamily": 0,
                            "dateupload": "1434470562",
                            "ownername": "Green Gate Farms",
                            "url_m": "https://farm6.staticflickr.com/5548/18243244543_a30a7189bf.jpg",
                            "height_m": "500",
                            "width_m": "375"
                        },
                        {
                            "id": "18864745071",
                            "owner": "58171316@N08",
                            "secret": "e2a526bd64",
                            "server": "5350",
                            "farm": 6,
                            "title": "Ingredients",
                            "ispublic": 1,
                            "isfriend": 0,
                            "isfamily": 0,
                            "dateupload": "1434470760",
                            "ownername": "William J H Leonard",
                            "url_m": "https://farm6.staticflickr.com/5350/18864745071_e2a526bd64.jpg",
                            "height_m": "500",
                            "width_m": "331"
                        },
                        {
                            "id": "18672070440",
                            "owner": "69753384@N00",
                            "secret": "5714bacb39",
                            "server": "5594",
                            "farm": 6,
                            "title": "Pepperoni & Eggs",
                            "ispublic": 1,
                            "isfriend": 0,
                            "isfamily": 0,
                            "dateupload": "1434459059",
                            "ownername": "ezigarlick",
                            "url_m": "https://farm6.staticflickr.com/5594/18672070440_5714bacb39.jpg",
                            "height_m": "404",
                            "width_m": "500"
                        },
                        {
                            "id": "18236487384",
                            "owner": "49499629@N02",
                            "secret": "6477116272",
                            "server": "3841",
                            "farm": 4,
                            "title": "",
                            "ispublic": 1,
                            "isfriend": 0,
                            "isfamily": 0,
                            "dateupload": "1434457056",
                            "ownername": "dixoncamera.com",
                            "url_m": "https://farm4.staticflickr.com/3841/18236487384_6477116272.jpg",
                            "height_m": "360",
                            "width_m": "500"
                        },
                        {
                            "id": "18668502378",
                            "owner": "131741240@N03",
                            "secret": "2d58b42b07",
                            "server": "3682",
                            "farm": 4,
                            "title": "clarity-breakfast",
                            "ispublic": 1,
                            "isfriend": 0,
                            "isfamily": 0,
                            "dateupload": "1434449342",
                            "ownername": "verbicpetrina",
                            "url_m": "https://farm4.staticflickr.com/3682/18668502378_2d58b42b07.jpg",
                            "height_m": "375",
                            "width_m": "500"
                        },
                        {
                            "id": "18857938351",
                            "owner": "43718245@N00",
                            "secret": "81ac2ba10f",
                            "server": "5604",
                            "farm": 6,
                            "title": "geroosterde aardappel, voorbereiding",
                            "ispublic": 1,
                            "isfriend": 0,
                            "isfamily": 0,
                            "dateupload": "1434444895",
                            "ownername": "ellenbouckaert",
                            "url_m": "https://farm6.staticflickr.com/5604/18857938351_81ac2ba10f.jpg",
                            "height_m": "417",
                            "width_m": "500"
                        },
                        {
                            "id": "18668976429",
                            "owner": "43718245@N00",
                            "secret": "3f5fabda20",
                            "server": "5467",
                            "farm": 6,
                            "title": "geroosterde aardappel",
                            "ispublic": 1,
                            "isfriend": 0,
                            "isfamily": 0,
                            "dateupload": "1434444691",
                            "ownername": "ellenbouckaert",
                            "url_m": "https://farm6.staticflickr.com/5467/18668976429_3f5fabda20.jpg",
                            "height_m": "333",
                            "width_m": "500"
                        },
                        {
                            "id": "18846049275",
                            "owner": "101668835@N05",
                            "secret": "7aacf4d4a7",
                            "server": "3919",
                            "farm": 4,
                            "title": "rush_2015-83",
                            "ispublic": 1,
                            "isfriend": 0,
                            "isfamily": 0,
                            "dateupload": "1434441786",
                            "ownername": "Thoon_Loque",
                            "url_m": "https://farm4.staticflickr.com/3919/18846049275_7aacf4d4a7.jpg",
                            "height_m": "343",
                            "width_m": "500"
                        },
                        {
                            "id": "18840928172",
                            "owner": "101668835@N05",
                            "secret": "15ae23b117",
                            "server": "3878",
                            "farm": 4,
                            "title": "rush_2015-84",
                            "ispublic": 1,
                            "isfriend": 0,
                            "isfamily": 0,
                            "dateupload": "1434441787",
                            "ownername": "Thoon_Loque",
                            "url_m": "https://farm4.staticflickr.com/3878/18840928172_15ae23b117.jpg",
                            "height_m": "343",
                            "width_m": "500"
                        }
                    ]
                },
                "stat": "ok"
            }
        );

        PotatoPhotosService.getPotatoPhotos().then(function (photos) {
            expect(photos.length).toEqual(20);
        });
        httpBackend.flush();
    });

    it("correct cache", function () {
        httpBackend.whenJSONP('https://api.flickr.com/services/rest/?api_key=503a3ba265e96c811cac7e7bb7489e20&extras=owner_name,date_upload,url_m&format=json&jsoncallback=JSON_CALLBACK&method=flickr.photos.search&per_page=20&tagMode=all&tags=potato').respond(
            {
                "photos": {
                    "page": 1,
                    "pages": 4812,
                    "perpage": 20,
                    "total": "96234",
                    "photo": [
                        {
                            "id": "18860887926",
                            "owner": "60699058@N04"
                        },
                        {
                            "id": "18266499023",
                            "owner": "60699058@N04",
                            "secret": "d2517e923b"

                        },
                        {
                            "id": "18689432308",
                            "owner": "67387943@N02",
                            "secret": "3137f26733"

                        },
                        {
                            "id": "18256510553",
                            "owner": "67387943@N02",
                            "secret": "ac0f508b7c",
                            "server": "5347",
                            "farm": 6

                        },
                        {
                            "id": "18871535082",
                            "owner": "67387943@N02",
                            "secret": "4e94852692",
                            "server": "3844",
                            "farm": 4

                        },
                        {
                            "id": "18254178474",
                            "owner": "67387943@N02",
                            "secret": "58a836812e",
                            "server": "5524",
                            "farm": 6

                        },
                        {
                            "id": "18254165794",
                            "owner": "67387943@N02",
                            "secret": "1f247b7c3b",
                            "server": "5465",
                            "farm": 6,
                            "title": "Lema Daturaphila, Mating Three-lined Potato Beetles 1 - Anaglyph 3D"

                        },
                        {
                            "id": "18254165394",
                            "owner": "67387943@N02",
                            "secret": "c31d70da1b",
                            "server": "5504"

                        },
                        {
                            "id": "18688989188",
                            "owner": "67387943@N02",
                            "secret": "298d03450c",
                            "server": "5339"

                        },
                        {
                            "id": "18254163954",
                            "owner": "67387943@N02",
                            "secret": "26e44d892d",
                            "server": "3878"

                        },
                        {
                            "id": "18252879264",
                            "owner": "17785846@N00",
                            "secret": "a35fb004a6",
                            "server": "5493"

                        },
                        {
                            "id": "18243244543",
                            "owner": "50803279@N03",
                            "secret": "a30a7189bf",
                            "server": "5548",
                            "farm": 6

                        },
                        {
                            "id": "18864745071",
                            "owner": "58171316@N08",
                            "secret": "e2a526bd64",
                            "server": "5350",
                            "farm": 6,
                            "title": "Ingredients"

                        },
                        {
                            "id": "18672070440",
                            "owner": "69753384@N00",
                            "secret": "5714bacb39",
                            "server": "5594",
                            "farm": 6,
                            "title": "Pepperoni & Eggs"

                        },
                        {
                            "id": "18236487384",
                            "owner": "49499629@N02",
                            "secret": "6477116272"
                        },
                        {
                            "id": "18668502378",
                            "owner": "131741240@N03",
                            "secret": "2d58b42b07",
                            "server": "3682"

                        },
                        {
                            "id": "18857938351",
                            "owner": "43718245@N00",
                            "secret": "81ac2ba10f",
                            "server": "5604",
                            "farm": 6

                        },
                        {
                            "id": "18668976429",
                            "owner": "43718245@N00",
                            "secret": "3f5fabda20",
                            "server": "5467",
                            "farm": 6

                        },
                        {
                            "id": "18846049275",
                            "owner": "101668835@N05",
                            "secret": "7aacf4d4a7",
                            "server": "3919",
                            "farm": 4,
                            "title": "rush_2015-83",
                            "ispublic": 1,
                            "isfriend": 0,
                            "isfamily": 0,
                            "dateupload": "1434441786",
                            "ownername": "Thoon_Loque",
                            "url_m": "https://farm4.staticflickr.com/3919/18846049275_7aacf4d4a7.jpg",
                            "height_m": "343",
                            "width_m": "500"
                        },
                        {
                            "id": "18840928172",
                            "owner": "101668835@N05",
                            "secret": "15ae23b117",
                            "server": "3878",
                            "farm": 4,
                            "title": "rush_2015-84",
                            "ispublic": 1,
                            "isfriend": 0,
                            "isfamily": 0,
                            "dateupload": "1434441787",
                            "ownername": "Thoon_Loque",
                            "url_m": "https://farm4.staticflickr.com/3878/18840928172_15ae23b117.jpg",
                            "height_m": "343",
                            "width_m": "500"
                        }
                    ]
                },
                "stat": "ok"
            }
        );

        PotatoPhotosService.getPotatoPhotos().then(function (photos) {
            var cache = FlickrPhotoService.getCache('potato');
            expect(cache.tags).toEqual(['potato']);
            expect(cache.photos).toEqual(photos);
        });
        httpBackend.flush();
    });

});
