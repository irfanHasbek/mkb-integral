var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var MongoStore = require('connect-mongo')(express);
mongoose.connect("mongodb://localhost:27017/integral", function(error) {
    if (error) {
        console.error("app > Mongoose can not connect to database");
        return;
    }

    module.exports = {
        app: app,
        mongoose: mongoose,
    };

    var Config = {
        url: 'http://localhost:3000'
    };

    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');
    app.use(express.favicon());
    //app.use(express.favicon(__dirname + '/views/img/favicon.ico'));
    app.use(express.bodyParser());
    app.use(express.cookieParser('Integral'));
    app.use(express.static(path.join(__dirname, 'views')));
    app.use(express.session({
        secret: 'integralmkblocalvericommanapp'
            /*,
                    store: new MongoStore({
                        db: 'integral',
                        host: 'localhost',
                        port: 27017 
                    })*/
    }));

    var InstallationController = require('./views/js/controller-js/InstallationController');
    var UserController = require('./views/js/controller-js/UserController');
    var UserService = require('./views/js/service-js/UserService');
    var userService = new UserService();

    var AccountController = require('./views/js/controller-js/AccountController');

    var CustomerGroupController = require("./views/js/controller-js/CustomerGroupController");
    var CustomerGroupService = require("./views/js/service-js/CustomerGroupService");

    var cgs = new CustomerGroupService();

    //vade tanımları "abuzer" start 25.02
    var CreditController = require("./views/js/controller-js/CreditController");
    var CreditService = require("./views/js/service-js/CreditService");
    var crs = new CreditService();
    // end

    //rol tanımları "abuzer" 27.02
    var ActDefinitonController = require("./views/js/controller-js/ActDefinitionController");
    var ActDefinitonService = require("./views/js/service-js/ActDefinitionService");
    var ads = new ActDefinitonService();
    //end

    //görev tanımları "abuzer" 27.02
    var TaskDefinitonController = require("./views/js/controller-js/TaskDefinitionController");
    var TaskDefinitonService = require("./views/js/service-js/TaskDefinitionService");
    var tds = new TaskDefinitonService();
    //end

    //il ilce tanimlari 
    var CityController = require("./views/js/controller-js/CityController");
    var CityService = require("./views/js/service-js/CityService");
    var cityservice = new CityService();
    //end

    //ürün grup tanımları "abuzer" 28.02 start 
    var ProductGroupDefinitionController = require("./views/js/controller-js/ProductGroupDefinitionController");
    var ProductGroupDefinitionService = require("./views/js/service-js/ProductGroupDefinitionService");
    var pds = new ProductGroupDefinitionService();
    //end

    //ürün tanimlari 
    var ProductController = require("./views/js/controller-js/ProductController");
    var ProductService = require("./views/js/service-js/ProductService");
    var productService = new ProductService();
    //end

    //ürün fiyat tanimlari 
    var ProductPriceController = require("./views/js/controller-js/ProductPriceController");
    var ProductPriceService = require("./views/js/service-js/ProductPriceService");
    var productPriceService = new ProductPriceService();
    //end

    //montaj türleri "abuzer" 28.02 start 
    var MontageTypeController = require("./views/js/controller-js/MontageTypeController");
    var MontageTypeService = require("./views/js/service-js/MontageTypeService");
    var mts = new MontageTypeService();
    //end

    //ayar mekanizması "abuzer" 28.02 start 
    var SetMechanismController = require("./views/js/controller-js/SetMechanismController");
    var SetMechanismService = require("./views/js/service-js/SetMechanismService");
    var sms = new SetMechanismService();
    //end

    //aksesuar "abuzer" 28.02 start 
    var AccessoryController = require("./views/js/controller-js/AccessoryController");
    var AccessoryService = require("./views/js/service-js/AccessoryService");
    var as = new AccessoryService();
    //end

    //kasa tipi "abuzer" start 
    var BodyTypeController = require("./views/js/controller-js/BodyTypeController");
    var BodyTypeService = require("./views/js/service-js/BodyTypeService");
    var bts = new BodyTypeService();
    //end

    //kapalama türleri "abuzer" 28.02 start 
    var CoverTypeController = require("./views/js/controller-js/CoverTypeController");
    var CoverTypeService = require("./views/js/service-js/CoverTypeService");
    var cts = new CoverTypeService();
    //end

    //teklif konusu "abuzer" 03.03 start 
    var OfferTopicController = require("./views/js/controller-js/OfferTopicController");
    var OfferTopicService = require("./views/js/service-js/OfferTopicService");
    var ots = new OfferTopicService();
    //end

    //teklif durumu "abuzer" 03.03 start 
    var OfferStatusController = require("./views/js/controller-js/OfferStatusController");
    var OfferStatusService = require("./views/js/service-js/OfferStatusService");
    var oss = new OfferStatusService();
    //end

    //kaybetme"abuzer" 03.03 start 
    var LosingReasonController = require("./views/js/controller-js/LosingReasonController");
    var LosingReasonService = require("./views/js/service-js/LosingReasonService");
    var lrs = new LosingReasonService();
    //end

    //müşteri tanımı "abuzer" 03.03 start 
    var CustomerDefinitionController = require("./views/js/controller-js/CustomerDefinitionController");
    var CustomerDefinitionService = require("./views/js/service-js/CustomerDefinitionService");
    var custservice = new CustomerDefinitionService();
    //end

    //teklif oluşturma "abuzer" 10.03 start 
    var CreateOfferController = require("./views/js/controller-js/CreateOfferController");
    var CreateOfferService = require("./views/js/service-js/CreateOfferService");
    var offerService = new CreateOfferService();
    //end

    //Firma tanimlari
    var FirmController = require('./views/js/controller-js/FirmController');
    var FirmService = require('./views/js/service-js/FirmService');
    var firmService = new FirmService();

    var UploadService = require('./views/js/service-js/UploadService');
    var OfferPriceCalculatorService = require('./views/js/service-js/OfferPriceCalculatorService');
    var offerPriceCalculatorService = new OfferPriceCalculatorService();

    var DiscountService = require('./views/js/service-js/DiscountService');
    var DiscountController = require('./views/js/controller-js/DiscountController');
    var discountService = new DiscountService();

    var UnitService = require('./views/js/service-js/UnitService');
    var UnitController = require('./views/js/controller-js/UnitController');
    var unitService = new UnitService();

    app.get("/", function(req, res) {
        if (req.session.user) {
            if (!req.session.login) {
                req.session.currentPage = "/";
                res.render('pages/login', {
                    layout: false,
                    session: req.session
                });
            } else {
                res.redirect('/index');
            }
        } else if (req.session.customer) {
            if (!req.session.loginCustomer) {
                res.send('Lutfen firmaniza vermis oldugumuz baglanti linkini kullaniniz !');
            } else {
                res.redirect('/musteri_anasayfa');
            }
        } else {
            req.session.currentPage = "/";
            res.render('pages/login', {
                layout: false,
                session: req.session
            });
        }

    });
    app.get("/index", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/index";
        req.session.pageLabel = "anasayfa";
        custservice.getCount(req.session.user.firmCode, function(stateCust, responseCust) {
            if (!stateCust) {
                res.render('pages/index', {
                    layout: false,
                    session: req.session
                });
                return;
            }
            offerService.searchandGetCount({
                "status.offerCase": "onay_bekleyen_teklifler"
            }, function(statePending, responsePending) {
                if (!statePending) {
                    res.render('pages/index', {
                        layout: false,
                        session: req.session
                    });
                    return;
                }
                offerService.searchandGetCount({
                    "status.offerCase": "kazanilmis"
                }, function(statePending, responseContinue) {
                    if (!statePending) {
                        res.render('pages/index', {
                            layout: false,
                            session: req.session
                        });
                        return;
                    }
                    offerService.searchandGetCount({
                        "status.offerCase": "kaybedilmis"
                    }, function(statePending, responseFinish) {
                        if (!statePending) {
                            res.render('pages/index', {
                                layout: false,
                                session: req.session
                            });
                            return;
                        }
                        res.render('pages/index', {
                            layout: false,
                            session: req.session,
                            customerCount: responseCust,
                            openOfferCount: responsePending,
                            winningOffer: responseContinue,
                            losingOffer: responseFinish
                        });
                    });
                });
            });
        });
    });
    // Raporlar
    app.get("/musteri_rapor", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/musteri_rapor";
        req.session.pageLabel = "raporlar";
        res.render('pages/musteri_rapor', {
            layout: false,
            session: req.session
        });
    });
    app.get("/urun_rapor", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/urun_rapor";
        req.session.pageLabel = "raporlar";
        res.render('pages/urun_rapor', {
            layout: false,
            session: req.session
        });
    });
    // Raporlar End
    app.get("/test_sayfasi", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/test_sayfasi";
        req.session.pageLabel = "testler";
        res.render('pages/test_sayfasi', {
            layout: false,
            session: req.session
        });
    });
    //Kullanicilar
    app.get("/kullanici_tanimi", AccountController.sessionCheck, AccountController.permissionCheck, function(req, res) {
        req.session.currentPage = "/kullanici_tanimi";
        req.session.pageLabel = "kullanicilar";
        ads.listAll(req.session.user.firmCode, function(stateRoles, responseRoles) {
            if (!stateRoles) {
                res.render("/pages/index", {
                    layout: false,
                    session: req.session
                });
                return;
            }
            tds.listAll(req.session.user.firmCode, function(stateTasks, responseTasks) {
                if (!stateTasks) {
                    res.render("/pages/index", {
                        layout: false,
                        session: req.session
                    });
                    return;
                }
                if (req.session.user.firmCode == 'administrator') {
                    userService.listAll(function(stateUser, responseUsers) {
                        if (!stateUser) {
                            res.render("/pages/index", {
                                layout: false,
                                session: req.session
                            });
                            return;
                        }
                        res.render('pages/kullanici_tanimi', {
                            layout: false,
                            session: req.session,
                            roles: responseRoles,
                            tasks: responseTasks,
                            users: responseUsers
                        });
                    });
                } else {
                    userService.listFirmUser(req.session.user.firmCode, function(stateUser, responseUsers) {
                        if (!stateUser) {
                            res.render("/pages/index", {
                                layout: false,
                                session: req.session
                            });
                            return;
                        }
                        res.render('pages/kullanici_tanimi', {
                            layout: false,
                            session: req.session,
                            roles: responseRoles,
                            tasks: responseTasks,
                            users: responseUsers
                        });
                    });
                }
            });
        });
    });

    //rol tanımları "abuzer" 27.02 start
    app.get("/rol_tanimi", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/rol_tanimi";
        req.session.pageLabel = "kullanicilar";
        ads.listAll(req.session.user.firmCode, function(state, response) {
            if (!state) {
                res.render("/pages/index", {
                    layout: false,
                    session: req.session
                });
                return;
            }
            res.render('pages/rol_tanimi', {
                layout: false,
                session: req.session,
                acts: response
            });
        });
    });
    //end
    // görev tanımları "abuzer" 27.02
    app.get("/gorev_tanimi", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/gorev_tanimi";
        req.session.pageLabel = "kullanicilar";
        tds.listAll(req.session.user.firmCode, function(state, response) {
            if (!state) {
                res.render("/pages/index", {
                    layout: false,
                    session: req.session
                });
                return;
            }
            res.render('pages/gorev_tanimi', {
                layout: false,
                session: req.session,
                tasks: response
            });
        });
    });
    //end
    app.get("/kullanici_izinleri", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/kullanici_izinleri";
        req.session.pageLabel = "kullanicilar";
        ads.listAll(req.session.user.firmCode, function(stateRole, resposeRole) {
            if (!stateRole) {
                res.render("/pages/index", {
                    layout: false,
                    session: req.session
                });
                return;
            }
            res.render('pages/kullanici_izinleri', {
                layout: false,
                session: req.session,
                roleList: resposeRole
            });
        });

    });
    //Tanimlamalar
    app.get("/vade_tanimlari", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/vade_tanimlari";
        req.session.pageLabel = "tanimlamalar";
        crs.listAll(req.session.user.firmCode, function(state, response) {
            if (!state) {
                res.render("/pages/index", {
                    layout: false,
                    session: req.session
                });
                return;
            }
            res.render('pages/vade_tanimlari', {
                layout: false,
                session: req.session,
                credits: response
            });
        });
    });
    app.get("/il_ilce_tanimlari", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/il_ilce_tanimlari";
        req.session.pageLabel = "tanimlamalar";
        cityservice.listAll(function(state, response) {
            if (!state) {
                res.render("/pages/index", {
                    layout: false,
                    session: req.session
                });
                return;
            }
            res.render('pages/il_ilce_tanimlari', {
                layout: false,
                session: req.session,
                citys: response
            });
        });
    });
    app.get("/firma_tanimlari", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/firma_tanimlari";
        req.session.pageLabel = "tanimlamalar";
        firmService.listAll(function(state, response) {
            if (!state) {
                res.render('pages/index', {
                    layout: false,
                    session: req.session
                });
                return;
            }
            res.render('pages/firma_tanimlari', {
                layout: false,
                session: req.session,
                firms: response
            });
        });
    });
    app.get("/musteri_grup_tanimlari", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/musteri_grup_tanimlari";
        req.session.pageLabel = "tanimlamalar";
        var d = 5;
        cgs.listAll(req.session.user.firmCode, function(state, response) {
            if (!state) {
                console.log(err);
                res.render("/pages/index", {
                    layout: false,
                    session: req.session
                });
            }
            res.render('pages/musteri_grup_tanimlari', {
                layout: false,
                session: req.session,
                customerGroups: response
            });
        });
    });
    //birim tanimlari
    app.get("/birim_tanimlari", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/birim_tanimlari";
        req.session.pageLabel = "tanimlamalar";
        var d = 5;
        unitService.listAll(req.session.user.firmCode, function(state, response) {
            if (!state) {
                console.log(err);
                res.render("/pages/index", {
                    layout: false,
                    session: req.session
                });
            }
            res.render('pages/birim_tanimlari', {
                layout: false,
                session: req.session,
                units: response
            });
        });
    });
    //end
    //teklif konusu "abuzer" 03.03 start
    app.get("/teklif_konu_tanimlari", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/teklif_konu_tanimlari";
        req.session.pageLabel = "tanimlamalar/teklifTanim";
        ots.listAll(req.session.user.firmCode, function(state, response) {
            if (!state) {
                console.log(err);
                res.render("/pages/index", {
                    layout: false,
                    session: req.session
                });
            }
            res.render('pages/teklif_konu_tanimlari', {
                layout: false,
                session: req.session,
                offerTopics: response
            });
        });
    });
    //end
    //teklif durumu "abuzer" 03.03 start
    app.get("/teklif_durum_tanimlari", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/teklif_durum_tanimlari";
        req.session.pageLabel = "tanimlamalar/teklifTanim";
        oss.listAll(req.session.user.firmCode, function(state, response) {
            if (!state) {
                console.log(err);
                res.render("/pages/index", {
                    layout: false,
                    session: req.session
                });
            }
            res.render('pages/teklif_durum_tanimlari', {
                layout: false,
                session: req.session,
                offerStatuses: response
            });
        });
    });
    app.get("/kaybetme_nedenleri", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/kaybetme_nedenleri";
        req.session.pageLabel = "tanimlamalar/teklifTanim";
        lrs.listAll(req.session.user.firmCode, function(state, response) {
            if (!state) {
                console.log(err);
                res.render("/pages/index", {
                    layout: false,
                    session: req.session
                });
            }
            res.render('pages/kaybetme_nedenleri', {
                layout: false,
                session: req.session,
                losingReasons: response
            });
        });
    });
    //ürünler 
    app.get("/urun_tanimlari", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/urun_tanimlari?id=0";
        req.session.pageLabel = "urunler";
        if (req.param('id') != 0) {
            pds.listAll(req.session.user.firmCode, function(statePGroup, responsePGroup) {
                if (!statePGroup) {
                    console.log(err);
                    res.render("/pages/index", {
                        layout: false,
                        session: req.session
                    });
                }
                //get product
                productService.getProduct(req.param('id'), function(stateProduct, responseProduct) {
                    if (!statePGroup) {
                        console.log(err);
                        res.render("/pages/index", {
                            layout: false,
                            session: req.session
                        });
                    }
                    res.render('pages/urun_tanimlari', {
                        layout: false,
                        session: req.session,
                        operation: 'update',
                        groups: responsePGroup,
                        product: responseProduct
                    });
                });
            });
        } else {
            pds.listAll(req.session.user.firmCode, function(statePGroup, responsePGroup) {
                if (!statePGroup) {
                    console.log(err);
                    res.render("/pages/index", {
                        layout: false,
                        session: req.session
                    });
                }
                //get product
                res.render('pages/urun_tanimlari', {
                    layout: false,
                    session: req.session,
                    operation: 'add',
                    groups: responsePGroup
                });
            });
        }
    });

    app.get("/urun_fiyat_tanimi", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/urun_fiyat_tanimi";
        req.session.pageLabel = "urunler";
        productService.listAll(req.session.user.firmCode, function(stateProduct, responseProduct) {
            if (!stateProduct) {
                console.log(err);
                res.render("/pages/index", {
                    layout: false,
                    session: req.session
                });
            }
            res.render('pages/urun_fiyat_tanimi', {
                layout: false,
                session: req.session,
                products: responseProduct
            });
        });
    });

    //urun grupları tanımları "abuzer" 28.02 start
    app.get("/urun_grup_tanimi", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/urun_grup_tanimi";
        req.session.pageLabel = "urunler";
        pds.listAll(req.session.user.firmCode, function(state, response) {
            if (!state) {
                console.log(err);
                res.render("/pages/index", {
                    layout: false,
                    session: req.session
                });
                return;
            }
            res.render('pages/urun_grup_tanimi', {
                layout: false,
                session: req.session,
                productGroups: response
            });
        });
    });
    //start
    app.get("/urun_listeleme", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/urun_listeleme";
        req.session.pageLabel = "urunler";
        productService.listAll(req.session.user.firmCode, function(state, response) {
            if (!state) {
                console.log(err);
                res.render("/pages/index", {
                    layout: false,
                    session: req.session
                });
                return;
            }
            pds.listAll(req.session.user.firmCode, function(statePGroup, responsePGroup) {
                if (!statePGroup) {
                    console.log(err);
                    res.render("/pages/index", {
                        layout: false,
                        session: req.session
                    });
                    return;
                }
                res.render('pages/urun_listeleme', {
                    layout: false,
                    session: req.session,
                    products: response,
                    productGroup: responsePGroup
                });
            });
        });

    });

    //montaj turleri "abuzer" 28.02 start
    app.get("/montaj_sekli", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/montaj_sekli";
        req.session.pageLabel = "urunler/ozellikler";
        mts.listAll(req.session.user.firmCode, function(state, response) {
            if (!state) {
                console.log(err);
                res.render("/pages/index", {
                    layout: false,
                    session: req.session
                });
            }
            pds.listAll(req.session.user.firmCode, function(stateProductGroup, responseProductGroup) {
                if (!stateProductGroup) {
                    console.log(responseProductGroup);
                    res.render("/pages/index", {
                        layout: false,
                        session: req.session
                    });
                }
                res.render('pages/montaj_sekli', {
                    layout: false,
                    session: req.session,
                    montageTypes: response,
                    productGroups: responseProductGroup
                });
            });
        });
    });
    //end

    //kaplama turleri "abuzer" 28.02 start
    app.get("/kaplama_sekli", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/kaplama_sekli";
        req.session.pageLabel = "urunler/ozellikler";
        cts.listAll(req.session.user.firmCode, function(state, response) {
            if (!state) {
                console.log(err);
                res.render("/pages/index", {
                    layout: false,
                    session: req.session
                });
            }
            res.render('pages/kaplama_sekli', {
                layout: false,
                session: req.session,
                coverTypes: response
            });
        });
    });
    //end
    //ayar mekanizması "abuzer" 28.02
    app.get("/ayar_mekanizmasi", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/ayar_mekanizmasi";
        req.session.pageLabel = "urunler/ozellikler";
        sms.listAll(req.session.user.firmCode, function(state, response) {
            if (!state) {
                console.log(err);
                res.render("/pages/index", {
                    layout: false,
                    session: req.session
                });
            }
            pds.listAll(req.session.user.firmCode, function(stateProductGroup, responseProductGroup) {
                if (!stateProductGroup) {
                    console.log(responseProductGroup);
                    res.render("/pages/index", {
                        layout: false,
                        session: req.session
                    });
                }
                res.render('pages/ayar_mekanizmasi', {
                    layout: false,
                    session: req.session,
                    setMechanisms: response,
                    productGroups: responseProductGroup
                });
            });

        });
    });
    //end
    //aksesuar "abuzer" 28.02 start
    app.get("/aksesuar", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/aksesuar";
        req.session.pageLabel = "urunler/ozellikler";
        as.listAll(req.session.user.firmCode, function(state, response) {
            if (!state) {
                console.log(response);
                res.render("/pages/index", {
                    layout: false,
                    session: req.session
                });
            }
            pds.listAll(req.session.user
                .firmCode,
                function(stateProductGroup, responseProductGroup) {
                    if (!stateProductGroup) {
                        console.log(responseProductGroup);
                        res.render("/pages/index", {
                            layout: false,
                            session: req.session
                        });
                    }
                    res.render('pages/aksesuar', {
                        layout: false,
                        session: req.session,
                        accessories: response,
                        productGroups: responseProductGroup
                    });
                });
        });
    });
    //end

    //kasa tipi "abuzer"  start
    app.get("/kasa_tipi", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/kasa_tipi";
        req.session.pageLabel = "urunler/ozellikler";
        bts.listAll(req.session.user.firmCode, function(state, response) {
            pds.listAll(req.session.user
                .firmCode,
                function(stateProductGroup, responseProductGroup) {
                    if (!stateProductGroup) {
                        console.log(responseProductGroup);
                        res.render("/pages/index", {
                            layout: false,
                            session: req.session
                        });
                    }
                    res.render('pages/kasa_tipi', {
                        layout: false,
                        session: req.session,
                        bodyTypes: response,
                        productGroups: responseProductGroup
                    });
                });
        });
    });
    //end

    //Müşteri "abuzer " 03.03 start
    app.get("/musteri_tanimi", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/musteri_tanimi?id=0";
        req.session.pageLabel = "musteri";
        if (req.param('id') != 0) {
            cgs.listAll(req.session.user.firmCode, function(stateCustGrp, responseCustGrp) {
                if (!stateCustGrp) {
                    console.error(responseCustGrp);
                    res.render("/pages/index", {
                        layout: false,
                        session: req.session
                    });
                }
                userService.listCustomerAgent(req.session.user.firmCode, function(stateCustAgnt, responseCustAgnt) {
                    if (!stateCustGrp) {
                        console.error(responseCustAgnt);
                        res.render("/pages/index", {
                            layout: false,
                            session: req.session
                        });
                    }
                    cityservice.listAll(function(stateCity, responseCity) {
                        if (!stateCity) {
                            console.error(responseCity);
                            res.render("/pages/index", {
                                layout: false,
                                session: req.session
                            });
                        }
                        custservice.getCustomerDefinition(req.param('id'), function(stateCustDef, responseCusetDef) {
                            if (!stateCustDef) {
                                console.error(responseCusetDef);
                                res.render("/pages/index", {
                                    layout: false,
                                    session: req.session
                                });
                            }
                            console.log("update girdi");
                            discountService.getDiscountOnlyCustomerId(req.param('id'), function(stateDiscount,
                                responseDiscount) {
                                if (!stateDiscount) {
                                    console.error(responseDiscount);
                                    res.render("/pages/index", {
                                        layout: false,
                                        session: req.session
                                    });
                                }
                                res.render('pages/musteri_tanimi', {
                                    layout: false,
                                    session: req.session,
                                    respCustDef: responseCusetDef,
                                    respCustGrps: responseCustGrp,
                                    respCustAgnts: responseCustAgnt,
                                    respCity: responseCity,
                                    operation: "update",
                                    discounts: responseDiscount
                                });
                            });
                        });
                    });
                });
            });
        } else {
            cgs.listAll(req.session.user.firmCode, function(stateCustGrp, responseCustGrp) {

                if (!stateCustGrp) {
                    console.error(err);
                    res.render("/pages/index", {
                        layout: false,
                        session: req.session
                    });
                }
                console.log("custdef add cgs");
                userService.listCustomerAgent(req.session.user.firmCode, function(stateCustAgnt, responseCustAgnt) {
                    if (!stateCustAgnt) {
                        console.error(err);
                        res.render("/pages/index", {
                            layout: false,
                            session: req.session
                        });
                    }
                    console.log("custdef add user");
                    cityservice.listAll(function(stateCity, responseCity) {
                        if (!stateCity) {
                            console.error(err);
                            res.render("/pages/index", {
                                layout: false,
                                session: req.session
                            });
                        }
                        discountService.getDiscountOnlyCustomerId(req.param('id'), function(stateDiscount,
                            responseDiscount) {
                            if (!stateDiscount) {
                                console.error(responseDiscount);
                                res.render("/pages/index", {
                                    layout: false,
                                    session: req.session
                                });
                            }
                            res.render('pages/musteri_tanimi', {
                                layout: false,
                                session: req.session,
                                respCustGrps: responseCustGrp,
                                respCustAgnts: responseCustAgnt,
                                respCity: responseCity,
                                operation: "add",
                                discounts: responseDiscount
                            });
                        });
                    });
                });
            });
        }
    });
    // end
    app.get("/musteri_listesi", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/musteri_listesi";
        req.session.pageLabel = "musteri";
        custservice.listAll(req.session.user.firmCode, function(state, response) {
            if (!state) {
                console.error(err);
                res.render("/pages/index", {
                    layout: false,
                    session: req.session
                });
            }
            cgs.listAll(req.session.user.firmCode, function(stateCustGroup, responseCustGroup) {
                if (!stateCustGroup) {
                    console.error(err);
                    res.render("/pages/index", {
                        layout: false,
                        session: req.session
                    });
                }
                userService.listCustomerAgent(req.session.user.firmCode, function(stateCustAgnt, responseCustAgnt) {
                    if (!stateCustAgnt) {
                        console.error(err);
                        res.render("/pages/index", {
                            layout: false,
                            session: req.session
                        });
                    }
                    res.render('pages/musteri_listesi', {
                        layout: false,
                        session: req.session,
                        customers: response,
                        custGroups: responseCustGroup,
                        custAgents: responseCustAgnt
                    });
                });
            });
        });
    });

    //müsteri iskonto
    app.get("/musteri_iskonto", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/musteri_iskonto";
        req.session.pageLabel = "musteri";
        custservice.listAll(req.session.user.firmCode, function(stateCustomer, responseCustomer) {
            if (!stateCustomer) {
                console.error(responseCustomer);
                res.render("/pages/index", {
                    layout: false,
                    session: req.session
                });
                return;
            }
            pds.listAll(req.session.user.firmCode, function(stateProductGroup, responseProductGroup) {
                if (!stateProductGroup) {
                    console.error(responseProductGroup);
                    res.render("/pages/index", {
                        layout: false,
                        session: req.session
                    });
                    return;
                }
                discountService.listAll(req.session.user.firmCode, function(stateDiscount, responseDiscounts) {
                    if (!stateDiscount) {
                        console.error(responseDiscounts);
                        res.render("/pages/index", {
                            layout: false,
                            session: req.session
                        });
                        return;
                    }
                    res.render('pages/musteri_iskonto', {
                        layout: false,
                        session: req.session,
                        customers: responseCustomer,
                        productGroup: responseProductGroup,
                        discounts: responseDiscounts
                    });
                })
            });
        });
    });
    //end

    //Teklif
    app.get("/teklif_olusturma", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/teklif_olusturma?id=0";
        req.session.pageLabel = "/teklifYonetim";
        if (req.param('id') != 0) {
            ots.listAll(req.session.user.firmCode, function(stateOfferTopic, responseOfferTopic) {
                if (!stateOfferTopic) {
                    console.error(responseOfferTopic);
                    res.render("/pages/index", {
                        layout: false,
                        session: req.session
                    });
                }
                offerService.getOffer(req.param('id'), function(stateOffer, resposeOffer) {
                    if (!stateOffer) {
                        console.error(resposeOffer);
                        res.render("/pages/index", {
                            layout: false,
                            session: req.session
                        });
                    }
                    cts.listAll(req.session.user.firmCode, function(stateCoverType, responseCoverType) {
                        if (!stateCoverType) {
                            console.error(responseCoverType);
                            res.render("/pages/index", {
                                layout: false,
                                session: req.session
                            });
                        }
                        custservice.getCustomerDefinition(resposeOffer.customerInfo.customerId, function(stateCustId,
                            responseCustId) {
                            if (!stateCustId) {
                                console.error(responseCustId);
                                res.render("/pages/index", {
                                    layout: false,
                                    session: req.session
                                });
                            }
                            pds.listAll(req.session.user.firmCode, function(stateProductGroup,
                                responseProductGroup) {
                                if (!stateProductGroup) {
                                    console.log(responseProductGroup);
                                    res.render("/pages/index", {
                                        layout: false,
                                        session: req.session
                                    });
                                }
                                oss.listAll(req.session.user.firmCode, function(stateOfferStatus,
                                    responseOfferStatus) {
                                    if (!stateOfferStatus) {
                                        console.log(responseOfferStatus);
                                        res.render("/pages/index", {
                                            layout: false,
                                            session: req.session
                                        });
                                    }
                                    custservice.listAll(req.session.user.firmCode, function(
                                        stateCust, responseCust) {
                                        if (!stateCust) {
                                            console.log(responseCust);
                                            res.render("/pages/index", {
                                                layout: false,
                                                session: req.session
                                            });
                                        }
                                        unitService.listAll(req.session.user.firmCode,
                                            function(stateUnit, responseUnit) {
                                                if (!stateUnit) {
                                                    console.log(responseUnit);
                                                    res.render("/pages/index", {
                                                        layout: false,
                                                        session: req.session
                                                    });
                                                }
                                                res.render('pages/teklif_olusturma', {
                                                    layout: false,
                                                    session: req.session,
                                                    offerTopics: responseOfferTopic,
                                                    offer: resposeOffer,
                                                    coverTypes: responseCoverType,
                                                    customers: responseCust,
                                                    custDef: responseCustId,
                                                    productGroups: responseProductGroup,
                                                    offerStatus: responseOfferStatus,
                                                    operation: "update",
                                                    units: responseUnit
                                                });
                                            });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        } else {
            ots.listAll(req.session.user.firmCode, function(stateOfferTopic, responseOfferTopic) {
                if (!stateOfferTopic) {
                    console.error(responseOfferTopic);
                    res.render("/pages/index", {
                        layout: false,
                        session: req.session
                    });
                }
                mts.listAll(req.session.user.firmCode, function(stateMontageType, responseMontageType) {
                    if (!stateMontageType) {
                        console.error(responseMontageType);
                        res.render("/pages/index", {
                            layout: false,
                            session: req.session
                        });
                    }
                    cts.listAll(req.session.user.firmCode, function(stateCoverType, responseCoverType) {
                        if (!stateCoverType) {
                            console.error(responseCoverType);
                            res.render("/pages/index", {
                                layout: false,
                                session: req.session
                            });
                        }
                        sms.listAll(req.session.user.firmCode, function(stateSetMec, responseSetMec) {
                            if (!stateSetMec) {
                                console.error(responseSetMec);
                                res.render("/pages/index", {
                                    layout: false,
                                    session: req.session
                                });
                            }
                            as.listAll(req.session.user.firmCode, function(stateAccessory, responseAccessory) {
                                if (!stateAccessory) {
                                    console.error(responseAccessory);
                                    res.render("/pages/index", {
                                        layout: false,
                                        session: req.session
                                    });
                                }
                                bts.listAll(req.session.user.firmCode, function(stateBodyType,
                                    responseBodyType) {
                                    if (!stateBodyType) {
                                        console.error(responseBodyType);
                                        res.render("/pages/index", {
                                            layout: false,
                                            session: req.session
                                        });
                                    }
                                    pds.listAll(req.session.user.firmCode, function(
                                        stateProductGroup, responseProductGroup) {
                                        if (!stateProductGroup) {
                                            console.log(responseProductGroup);
                                            res.render("/pages/index", {
                                                layout: false,
                                                session: req.session
                                            });
                                        }
                                        oss.listAll(req.session.user.firmCode, function(
                                            stateOfferStatus,
                                            responseOfferStatus) {
                                            if (!stateOfferStatus) {
                                                console.log(responseOfferStatus);
                                                res.render("/pages/index", {
                                                    layout: false,
                                                    session: req.session
                                                });
                                            }
                                            custservice.listAll(req.session.user
                                                .firmCode,
                                                function(stateCust,
                                                    responseCust) {
                                                    if (!stateCust) {
                                                        console.log(
                                                            responseCust
                                                        );
                                                        res.render(
                                                            "/pages/index", {
                                                                layout: false,
                                                                session: req
                                                                    .session
                                                            });
                                                    }
                                                    unitService.listAll(req
                                                        .session.user.firmCode,
                                                        function(
                                                            stateUnit,
                                                            responseUnit
                                                        ) {
                                                            if (!
                                                                stateUnit
                                                            ) {
                                                                console
                                                                    .log(
                                                                        responseUnit
                                                                    );
                                                                res.render(
                                                                    "/pages/index", {
                                                                        layout: false,
                                                                        session: req
                                                                            .session
                                                                    }
                                                                );
                                                            }
                                                            res.render(
                                                                'pages/teklif_olusturma', {
                                                                    layout: false,
                                                                    session: req
                                                                        .session,
                                                                    offerTopics: responseOfferTopic,
                                                                    montageTypes: responseMontageType,
                                                                    coverTypes: responseCoverType,
                                                                    customers: responseCust,
                                                                    setMechanisms: responseSetMec,
                                                                    accessories: responseAccessory,
                                                                    bodyTypes: responseBodyType,
                                                                    productGroups: responseProductGroup,
                                                                    offerStatus: responseOfferStatus,
                                                                    operation: "add",
                                                                    units: responseUnit
                                                                });
                                                        });
                                                });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }
    });
    app.get("/acik_teklifler", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/acik_teklifler";
        req.session.pageLabel = "/teklifYonetim";
        offerService.search({
            'status.offerCase': 'acik_teklifler',
            'firmCode': req.session.user.firmCode
        }, function(stateOffers, responseOffers) {
            if (!stateOffers) {
                console.log(responseOffers);
                res.render("/pages/index", {
                    layout: false,
                    session: req.session
                });
            }
            lrs.listAll(req.session.user.firmCode, function(stateLosingReason, responseLosingReason) {
                if (!stateLosingReason) {
                    console.log(responseLosingReason);
                    res.render("/pages/index", {
                        layout: false,
                        session: req.session
                    });
                }
                oss.listAll(req.session.user.firmCode, function(stateOfferStatus, responseOfferStatus) {
                    if (!stateOfferStatus) {
                        console.log(responseOfferStatus);
                        res.render("/pages/index", {
                            layout: false,
                            session: req.session
                        });
                        return;
                    }
                    userService.listFirmUser(req.session.user.firmCode, function(stateUser, responseUsers) {
                        if (!stateUser) {
                            console.log(stateUser);
                            res.render("/pages/index", {
                                layout: false,
                                session: req.session
                            });
                            return;
                        }
                        res.render('pages/acik_teklifler', {
                            layout: false,
                            session: req.session,
                            offers: responseOffers,
                            orderStatuses: responseOfferStatus,
                            losingReasons: responseLosingReason,
                            users: responseUsers
                        });
                    });
                });
            });
        });
    });
    app.get("/onay_bekleyen_teklifler", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/onay_bekleyen_teklifler";
        req.session.pageLabel = "/teklifYonetim";
        offerService.search({
            'status.offerCase': 'onay_bekleyen_teklifler',
            'firmCode': req.session.user.firmCode
        }, function(stateOffers, responseOffers) {
            if (!stateOffers) {
                console.log(responseOffers);
                res.render("/pages/index", {
                    layout: false,
                    session: req.session
                });
            }
            lrs.listAll(req.session.user.firmCode, function(stateLosingReason, responseLosingReason) {
                if (!stateLosingReason) {
                    console.log(responseLosingReason);
                    res.render("/pages/index", {
                        layout: false,
                        session: req.session
                    });
                }
                oss.listAll(req.session.user.firmCode, function(stateOfferStatus, responseOfferStatus) {
                    if (!stateOfferStatus) {
                        console.log(responseOfferStatus);
                        res.render("/pages/index", {
                            layout: false,
                            session: req.session
                        });
                        return;
                    }
                    userService.listFirmUser(req.session.user.firmCode, function(stateUser, responseUsers) {
                        if (!stateUser) {
                            console.log(stateUser);
                            res.render("/pages/index", {
                                layout: false,
                                session: req.session
                            });
                            return;
                        }
                        res.render('pages/onay_bekleyen_teklifler', {
                            layout: false,
                            session: req.session,
                            offers: responseOffers,
                            orderStatuses: responseOfferStatus,
                            losingReasons: responseLosingReason,
                            users: responseUsers
                        });
                    });
                });
            });
        });
    });
    app.get("/kazanilmis", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/kazanilmis";
        req.session.pageLabel = "/teklifYonetim/kapali";
        offerService.search({
            'status.offerCase': 'kazanilmis',
            'firmCode': req.session.user.firmCode
        }, function(stateOffers, responseOffers) {
            if (!stateOffers) {
                console.error(responseOffers);
                res.render("/pages/index", {
                    layout: false,
                    session: req.session
                });
                return;
            }
            res.render('pages/kazanilmis', {
                layout: false,
                session: req.session,
                offers: responseOffers
            });
        });
    });
    app.get("/kaybedilmis", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/kaybedilmis";
        req.session.pageLabel = "/teklifYonetim/kapali";
        offerService.search({
            'status.offerCase': 'kaybedilmis',
            'firmCode': req.session.user.firmCode
        }, function(stateOffers, responseOffers) {
            if (!stateOffers) {
                console.error(responseOffers);
                res.render("/pages/index", {
                    layout: false,
                    session: req.session
                });
                return;
            }
            res.render('pages/kaybedilmis', {
                layout: false,
                session: req.session,
                offers: responseOffers
            });
        });
    });
    //Teklif End

    //Onay_bekleyen
    app.get("/is_emri/onay_bekleyen", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/is_emri/onay_bekleyen";
        req.session.pageLabel = "isEmri";
        offerService.search({
            "status.job": "onay_bekleyen",
            "firmCode": req.session.user.firmCode
        }, function(stateOffers, responseOffers) {
            if (!stateOffers) {
                console.error(responseOffers);
                res.render("/pages/index", {
                    layout: false,
                    session: req.session
                });
                return;
            }
            res.render('pages/is_emri_onay_bekleyen', {
                layout: false,
                session: req.session,
                offers: responseOffers
            });
        });
    });
    //Onay_Bekleyen End

    //Devam_eden
    app.get("/is_emri/devam_eden", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/is_emri/devam_eden";
        req.session.pageLabel = "isEmri";
        offerService.search({
            "status.job": "devam_eden",
            "firmCode": req.session.user.firmCode
        }, function(stateOffers, responseOffers) {
            if (!stateOffers) {
                console.error(responseOffers);
                res.render("/pages/index", {
                    layout: false,
                    session: req.session
                });
                return;
            }
            res.render('pages/is_emri_devam_eden', {
                layout: false,
                session: req.session,
                offers: responseOffers
            });
        });
    });
    //Devam_eden End

    //Tamamlanmıs
    app.get("/is_emri/tamamlanmis", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/is_emri/tamamlanmis";
        req.session.pageLabel = "isEmri";
        offerService.search({
            "status.job": "tamamlanmis",
            "firmCode": req.session.user.firmCode
        }, function(stateOffers, responseOffers) {
            if (!stateOffers) {
                console.error(responseOffers);
                res.render("/pages/index", {
                    layout: false,
                    session: req.session
                });
                return;
            }
            res.render('pages/is_emri_tamamlanmis', {
                layout: false,
                session: req.session,
                offers: responseOffers
            });
        });
    });

    //İş emri Yazdır
    app.get("/is_emri_yazdir", function(req, res) {
        req.session.currentPage = "/is_emri_yazdir";
        req.session.pageLabel = "is_emri";
        offerService.getOffer(req.param('id'), function(stateOffer, resposeOffer) {
            if (!stateOffer) {
                console.error(resposeOffer);
                res.render("/pages/index", {
                    layout: false,
                    session: req.session
                });
            }
            var code = req.param('code');
            firmService.getInformationFirmCode(code, function(stateFirm, responseFirm) {
                if (!stateFirm) {
                    console.error(responseFirm);
                    res.render("/pages/index", {
                        layout: false
                    });
                }
                res.render('pages/is_emri_yazdir', {
                    layout: false,
                    session: req.session,
                    offer: resposeOffer,
                    firm: responseFirm
                });
            });

        });
    });
    //Teklif Yazdır
    app.get("/teklif_yazdir", function(req, res) {
        req.session.currentPage = "/teklif_yazdir";
        req.session.pageLabel = "teklif_yazdir";
        offerService.getOffer(req.param('id'), function(stateOffer, resposeOffer) {
            if (!stateOffer) {
                console.error(resposeOffer);
                res.render("/pages/index", {
                    layout: false
                });
            }
            var code = req.param('code');
            firmService.getInformationFirmCode(code, function(stateFirm, responseFirm) {
                if (!stateFirm) {
                    console.error(responseFirm);
                    res.render("/pages/index", {
                        layout: false
                    });
                }
                res.render('pages/teklif_yazdir', {
                    layout: false,
                    offer: resposeOffer,
                    firm: responseFirm
                });
            });
        });
    });
    //Tamamlanmıs End

    //B2B Yönetim
    app.get("/hesap_bilgileri", AccountController.sessionCheck, function(req, res) {
        req.session.currentPage = "/hesap_bilgileri";
        req.session.pageLabel = "B2B";

        custservice.listAll(req.session.user.firmCode, function(state, response) {
            if (!state) {
                res.render("/pages/index", {
                    layout: false,
                    session: req.session
                });
                return;
            }
            res.render('pages/hesap_bilgileri', {
                layout: false,
                session: req.session,
                customers: response
            });
        })
    });

    //B2B Yönetim End

    //musteri kayit 
    app.get("/musteri_kayit", function(req, res) {
        if (req.session.loginCustomer) {
            res.redirect('/musteri_anasayfa');
        } else {
            req.session.currentPage = "/musteri_kayit";
            res.render("pages/musteri_kayit", {
                layout: false,
                firm: req.param('id')
            });
        }
    });
    //end
    //musteri_anasayfa
    app.get("/musteri_anasayfa", AccountController.sessionCheckCustomer, function(req, res) {
        req.session.currentPage = "/musteri_anasayfa";
        req.session.pageLabel = "musteriAnasayfa";
        res.render("pages/musteri", {
            layout: false,
            session: req.session,
            customer: req.session.customer
        });
    });
    //end
    //müsteri tanımı
    app.get("/b2b_musteri_tanimi", AccountController.sessionCheckCustomer, function(req, res) {
        req.session.currentPage = "/b2b_musteri_tanimi";
        req.session.pageLabel = "b2b_musteri_tanimi";
        cityservice.listAll(function(stateCity, responseCity) {
            if (!stateCity) {
                console.error(responseCity);
                res.redirect("musteri_anasayfa");
            }
            res.render("pages/b2b_musteri_tanimi", {
                layout: false,
                session: req.session,
                customer: req.session.customer,
                respCity: responseCity
            });
        });
    });
    //end
    //offer tanımı
    app.get("/b2b_teklif", AccountController.sessionCheckCustomer, function(req, res) {
        req.session.currentPage = "/b2b_teklif?id=0";
        req.session.pageLabel = "b2b_teklif";
        if (req.param('id') != 0) {
            offerService.getOffer(req.param('id'), function(stateOffer, resposeOffer) {
                if (!stateOffer) {
                    console.error(resposeOffer);
                    res.render("/pages/index", {
                        layout: false,
                        session: req.session
                    });
                }
                cts.listAll(req.session.customer.firmCode, function(stateCoverType, responseCoverType) {
                    if (!stateCoverType) {
                        console.error(responseCoverType);
                        res.render("/pages/index", {
                            layout: false,
                            session: req.session
                        });
                    }
                        pds.listAll(req.session.customer.firmCode, function(stateProductGroup, responseProductGroup) {
                            if (!stateProductGroup) {
                                console.log(responseProductGroup);
                                res.render("/pages/index", {
                                    layout: false,
                                    session: req.session
                                });
                            }
                                unitService.listAll(req.session.customer.firmCode, function(stateUnit,
                                    responseUnit) {
                                    if (!stateUnit) {
                                        console.log(responseUnit);
                                        res.render("/pages/index", {
                                            layout: false,
                                            session: req.session
                                        });
                                    }
                                    res.render('pages/b2b_teklif', {
                                        layout: false,
                                        session: req.session,
                                        offer: resposeOffer,
                                        coverTypes: responseCoverType,
                                        productGroups: responseProductGroup,
                                        operation: "update",
                                        units: responseUnit
                                    });
                           
                        });
                    });
                });
            });
        } else {
            cts.listAll(req.session.customer.firmCode, function(stateCoverType, responseCoverType) {
                if (!stateCoverType) {
                    console.error(responseCoverType);
                    res.render("/pages/index", {
                        layout: false,
                        session: req.session
                    });
                }
                pds.listAll(req.session.customer.firmCode, function(stateProductGroup, responseProductGroup) {
                    if (!stateProductGroup) {
                        console.log(responseProductGroup);
                        res.render("/pages/index", {
                            layout: false,
                            session: req.session
                        });
                    }
                    unitService.listAll(req.session.customer.firmCode, function(stateUnit, responseUnit) {
                        if (!stateUnit) {
                            console.log(responseUnit);
                            res.render("/pages/index", {
                                layout: false,
                                session: req.session
                            });
                        }
                        res.render('pages/b2b_teklif', {
                            layout: false,
                            session: req.session,
                            coverTypes: responseCoverType,
                            productGroups: responseProductGroup,
                            operation: "add",
                            units: responseUnit
                        });
                    });
                });
            });
        }
    });
    //end
    //müsteri tanımı
    app.get("/b2b_teklif_listesi", AccountController.sessionCheckCustomer, function(req, res) {
        req.session.currentPage = "/b2b_teklif_listesi";
        req.session.pageLabel = "b2b_teklif_listesi";
        offerService.search({
            "firmCode": req.session.customer.firmCode,
            "customerInfo.customerId": req.session.customer._id
        }, function(stateOffers, responseOffers) {
            if (!stateOffers) {
                console.error(responseOffers);
                res.redirect("musteri_anasayfa");
            }
            res.render("pages/b2b_teklif_listesi", {
                layout: false,
                session: req.session,
                customer: req.session.customer,
                offers: responseOffers
            });
        });
    });
    //end

    app.get('/installation/addAdmin', InstallationController.addAdminUser);
    app.get('/installation/addFirms', InstallationController.addFirms);
    app.get('/installation/addRole', InstallationController.addRole);
    app.get('/installation/addcityandstate', InstallationController.addCityAndState);
    app.post('/login', AccountController.login);
    app.post('/customerlogin', AccountController.customerLogin);
    app.get('/logout', AccountController.logout);
    app.post('/wsuser/addnew', AccountController.permissionCheck, UserController.addNew);
    app.post('/wsuser/update', UserController.update);
    app.post('/wsuser/remove', UserController.remove);
    app.post('/wsuser/getwithid', UserController.getWithId);
    app.get('/wsuser/listall', UserController.listAll);
    app.get('/wsuser/removeall', UserController.removeAll);

    //firma tanimlar webservisleri
    app.get('/wsfirm/listall', FirmController.listAll);
    app.post('/wsfirm/update1', FirmController.update1);
    app.post('/wsfirm/update2', FirmController.update2);
    app.get('/wsfirm/removeall', FirmController.removeAll);
    app.post('/wsfirm/getInfo', FirmController.getInformation);

    //musteri_grup ops. "abuzer"

    app.post("/wscustomergroup/addnew", CustomerGroupController.addCustomerGroup);
    app.get("/wscustomergroup/listall", CustomerGroupController.listAll);
    app.get("/wscustomergroup/removeall", CustomerGroupController.removeAll);
    app.post("/wscustomergroup/remove", CustomerGroupController.remove);

    app.post("/wsunit/addnew", UnitController.addNew);
    app.get("/wsunit/listall", UnitController.listAll);
    app.get("/wsunit/removeall", UnitController.removeAll);
    app.post("/wsunit/remove", UnitController.remove);

    app.post("/wspicture/upload", UploadService.uploadImage);

    //credit ops "abuzer"  start  25.02 
    app.post("/wscredit/addnew", CreditController.addCredit);
    app.get("/wscredit/listall", CreditController.listAll);
    app.get("/wscredit/removeall", CreditController.removeAll);
    app.post("/wscredit/remove", CreditController.remove);
    //end

    //city ops "abuzer"  start  26.02 
    app.post("/wscity/addnew", CityController.addCity);
    app.get("/wscity/listall", CityController.listAll);
    app.get("/wscity/removeall", CityController.removeAll);
    app.post("/wscity/remove", CityController.remove);
    app.post("/wscity/addtown", CityController.addTown);
    app.post("/wscity/removetown", CityController.removeTown);
    app.post("/wscity/gettowns", CityController.getTowns);
    //end

    //rol tanımları ops "abuzer" 27.02 start
    app.post("/wsactdefinition/addnew", ActDefinitonController.addActDefinition);
    app.get("/wsactdefinition/listall", ActDefinitonController.listAll);
    app.get("/wsactdefinition/removeall", ActDefinitonController.removeAll);
    app.post("/wsactdefinition/remove", ActDefinitonController.remove);
    //end

    //rol tanımları ops "abuzer" 27.02 start
    app.post("/wstaskdefinition/addnew", TaskDefinitonController.addTaskDefinition);
    app.get("/wstaskdefinition/listall", TaskDefinitonController.listAll);
    app.get("/wstaskdefinition/removeall", TaskDefinitonController.removeAll);
    app.post("/wstaskdefinition/remove", TaskDefinitonController.remove);
    //end

    //ürün grup tanımları ops "abuzer" 28.02 start
    app.post("/wsproductgroupdefinition/addnew", ProductGroupDefinitionController.addProductGroupDefinition);
    app.get("/wsproductgroupdefinition/listall", ProductGroupDefinitionController.listAll);
    app.get("/wsproductgroupdefinition/removeall", ProductGroupDefinitionController.removeAll);
    app.post("/wsproductgroupdefinition/remove", ProductGroupDefinitionController.remove);
    //end

    //montaj şekli ops "abuzer" 28.02 start
    app.post("/wsmontagetype/addnew", MontageTypeController.addMontageType);
    app.get("/wsmontageype/listall", MontageTypeController.listAll);
    app.post("/wsmontagetype/search", MontageTypeController.search);
    app.get("/wsmontagetype/removeall", MontageTypeController.removeAll);
    app.post("/wsmontagetype/remove", MontageTypeController.remove);
    app.post("/wsmontagetype/getbygroupname", MontageTypeController.getByGroupName);
    //end

    //kaplama şekli ops "abuzer" 28.02 start
    app.post("/wscovertype/addnew", CoverTypeController.addCoverType);
    app.get("/wscovertype/listall", CoverTypeController.listAll);
    app.get("/wscovertype/removeall", CoverTypeController.removeAll);
    app.post("/wscovertype/remove", CoverTypeController.remove);
    //end

    //ayar mekanizması ops "abuzer" 28.02 start
    app.post("/wssetmechanism/addnew", SetMechanismController.addSetMechanism);
    app.get("/wssetmechanism/listall", SetMechanismController.listAll);
    app.post("/wssetmechanism/search", SetMechanismController.search);
    app.get("/wssetmechanism/removeall", SetMechanismController.removeAll);
    app.post("/wssetmechanism/remove", SetMechanismController.remove);
    app.post("/wssetmechanism/getbygroupname", SetMechanismController.getByGroupName);
    //end

    //aksesuar ops "abuzer" 28.02 start
    app.post("/wsaccessory/addnew", AccessoryController.addAccessory);
    app.get("/wsaccessory/listall", AccessoryController.listAll);
    app.post("/wsaccessory/search", AccessoryController.search);
    app.get("/wsaccessory/removeall", AccessoryController.removeAll);
    app.post("/wsaccessory/remove", AccessoryController.remove);
    app.post("/wsaccessory/getbygroupname", AccessoryController.getByGroupName);
    //end

    //kasa tipi ops "abuzer" start
    app.post("/wsbodytype/addnew", BodyTypeController.addBodyType);
    app.get("/wsbodytype/listall", BodyTypeController.listAll);
    app.get("/wsbodytype/removeall", BodyTypeController.removeAll);
    app.post("/wsbodytype/search", BodyTypeController.search);
    app.post("/wsbodytype/remove", BodyTypeController.remove);
    app.post("/wsbodytype/getbygroupname", BodyTypeController.getByGroupName);
    //end

    //teklif konusu ops "abuzer" 03.03 start
    app.post("/wsoffertopic/addnew", OfferTopicController.addOfferTopic);
    app.get("/wsoffertopic/listall", OfferTopicController.listAll);
    app.get("/wsoffertopic/removeall", OfferTopicController.removeAll);
    app.post("/wsoffertopic/remove", OfferTopicController.remove);
    //end

    //teklif konusu ops "abuzer" 03.03 start
    app.post("/wsofferstatus/addnew", OfferStatusController.addOfferStatus);
    app.get("/wsofferstatus/listall", OfferStatusController.listAll);
    app.get("/wsofferstatus/removeall", OfferStatusController.removeAll);
    app.post("/wsofferstatus/remove", OfferStatusController.remove);
    //end

    //Kaybetme nedenleri ops "abuzer" 03.03 start
    app.post("/wslosingreason/addnew", LosingReasonController.addLosingReason);
    app.get("/wslosingreason/listall", LosingReasonController.listAll);
    app.get("/wslosingreason/removeall", LosingReasonController.removeAll);
    app.post("/wslosingreason/remove", LosingReasonController.remove);
    //end

    //urun tanimlama
    app.post("/wsproduct/add", ProductController.add);
    app.post("/wsproduct/update", ProductController.update);
    app.post("/wsproduct/remove", ProductController.remove);
    app.get("/wsproduct/listall", ProductController.listAll);
    app.get("/wsproduct/removeall", ProductController.removeAll);
    app.post("/wsproduct/getproduct", ProductController.getProduct);
    app.post("/wsproduct/textsearchproduct", ProductController.textSearch);
    app.post("/wsproduct/search", ProductController.searchProduct);

    //end

    //urun fiyat tanimlama
    app.post("/wsproductprice/add", ProductPriceController.add);
    app.post("/wsproductprice/update", ProductPriceController.update);
    app.post("/wsproductprice/remove", ProductPriceController.remove);
    app.post("/wsproductprice/removeproduct", ProductPriceController.removeProduct);
    app.get("/wsproductprice/listall", ProductPriceController.listAll);
    app.get("/wsproductprice/removeall", ProductPriceController.removeAll);
    app.post("/wsproductprice/listproductprice", ProductPriceController.listProductPrice);
    //end

    //müsteri tanımları "abuzer" 03.03 start
    app.post("/wscustomerdefinition/addnew", CustomerDefinitionController.addNew);
    app.post("/wscustomerdefinition/register", CustomerDefinitionController.addNew);
    app.post("/wscustomerdefinition/search", CustomerDefinitionController.searchCustomerDefinition);
    app.post("/wscustomerdefinition/update", CustomerDefinitionController.update);
    app.post("/wscustomerdefinition/b2bupdate", CustomerDefinitionController.update);
    app.post("/wscustomerdefinition/remove", CustomerDefinitionController.remove);
    app.get("/wscustomerdefinition/listall", CustomerDefinitionController.listAll);
    app.get("/wscustomerdefinition/removeall", CustomerDefinitionController.removeAll);
    app.post("/wscustomerdefinition/getcustomerdefinition", CustomerDefinitionController.getCustomerDefinition);
    app.post("/wscustomerdefinition/updateb2binformation", CustomerDefinitionController.updateB2BInformation);
    //end

    //teklif oluşturma "abuzer" 10.03 start
    app.post("/wsoffer/addnew", CreateOfferController.addNew);
    app.post("/wsoffer/b2badd", CreateOfferController.addNew);
    app.post("/wsoffer/search", CreateOfferController.searchOffer);
    app.post("/wsoffer/update", CreateOfferController.update);
    app.post("/wsoffer/b2bupdate", CreateOfferController.update);
    app.post("/wsoffer/remove", CreateOfferController.remove);
    app.get("/wsoffer/listall", CreateOfferController.listAll);
    app.get("/wsoffer/removeall", CreateOfferController.removeAll);
    app.post("/wsoffer/getoffer", CreateOfferController.getOffer);
    app.post("/wsoffer/updatestatus", CreateOfferController.updateStatus);
    app.post("/wsoffer/updatejobstatus", CreateOfferController.updateJobStatus);
    app.post("/wsoffer/updatedates", CreateOfferController.updateDates);
    app.post("/wsoffer/updatenote", CreateOfferController.updateProductNote);
    app.post("/wsoffer/updateoffercase", CreateOfferController.updateOfferCase);
    app.post("/wsoffer/updateoffercaseforconfirm", CreateOfferController.updateOfferCaseForConfirm);
    app.post("/wsoffer/updateoffercaseforcancel", CreateOfferController.updateOfferCaseForCancel);
    app.post("/wsoffer/addactivity", CreateOfferController.addActivity);
    app.post("/wsoffer/removeactivity", CreateOfferController.removeActivity);
    app.post("/wsoffer/updateActivity", CreateOfferController.updateActivity);
    app.post("/wsoffer/updatepdfinfo", CreateOfferController.updatePdfInfo);
    //end
    //user permission
    var UserPermissions = require('./views/js/service-js/UserPermissionService');
    app.get("/wspermission/listall", UserPermissions.listAll);
    app.get("/wspermission/reset", UserPermissions.reset);
    app.get("/wspermission/removeall", UserPermissions.removeAll);
    app.post("/wspermission/update", UserPermissions.update);
    app.post("/wspermission/getpermissionrole", UserPermissions.getPermissionForRole);
    //end
    //discount
    app.post('/wsdiscount/addnew', DiscountController.addNew);
    app.post('/wsdiscount/remove', DiscountController.remove);
    app.get('/wsdiscount/removeall', DiscountController.removeAll);
    app.post('/wsdiscount/getdiscount', DiscountController.getDiscount);
    app.post('/wsdiscount/getdiscountonlycustomerid', DiscountController.getDiscountOnlyCustomerId);
    app.get('/wsdiscount/listall', DiscountController.listAll);
    //end
    app.post("/wspricecalculate/calculate", function(req, res) {
        offerPriceCalculatorService.calculatePrice(req.body.info, function(state, response, message) {
            if (!state) {
                res.send({
                    state: state,
                    response: response,
                    message: message
                });
                return;
            }
            res.send({
                state: state,
                response: response,
                message: message
            });
        });
    });

    var wkhtmltopdf = require('wkhtmltopdf');
    app.post("/wscreatepdf", function(req, res) {
        var pageURl = Config.url + req.body.pageUrl;
        wkhtmltopdf(pageURl, {
            output: './views/pdfs/' + req.body.pageName,
            orientation: 'Landscape'
        }, function(error, createdPdf) {
            if (error) {
                console.log(error);
                res.send({
                    state: false,
                    response: error
                });
                return;
            }
            res.send({
                state: true,
                fileName: req.body.pageName,
                url: '/pdfs/' + req.body.pageName
            });
        });

    });

    function sleepFor(sleepDuration) {
        var now = new Date().getTime();
        while (new Date().getTime() < now + sleepDuration) { /* do nothing */ }
    }
    var nodemailer = require('nodemailer');
    app.post("/wssendmail", function(req, res) {
        var attachs = req.body.attachment;
        firmService.getInformationFirmCode(req.session.user.firmCode, function(stateFirm, responseFirm) {
            if (!stateFirm) {
                console.log(stateFirm);
                res.send({
                    message: 'Email configuration hatasi'
                });
                return;
            }
            var smtpTransport = nodemailer.createTransport("SMTP", {
                service: "Gmail",
                auth: {
                    user: responseFirm.email,
                    pass: responseFirm.password
                }
            });
            var mail = {
                from: req.session.user.name + ' ' + req.session.user.surname + '<' + responseFirm.email + '>',
                to: req.body.email,
                subject: responseFirm.name + " Bilgilendirme maili",
                text: req.body.emailDesc,
                html: "",
                attachments: [{
                    filePath: Config.url + attachs
                }]
            };
            //sleepFor(12000);
            smtpTransport.sendMail(mail, function(errorMail, response) {
                if (errorMail) {
                    console.log(errorMail);
                    res.send({
                        state: false,
                        message: 'Mail Gonderme hatasi'
                    });
                    return;
                } else {
                    console.log("Message sent: " + response.message);
                }
                smtpTransport.close();
                res.send({
                    state: true,
                    response: response.message
                });

            });
        });
    });
    var Convert = require("./views/js/service-js/ConvertService");
    app.post('/wsuploadprice', function(req, res) {
        Convert.convertToJson(req.files.csvFile.path, req.body.productId, req.body.dimensionType, function(state, response) {
            productPriceService.bulkInsert(response, function(state, count) {
                if (!state) {
                    res.send({
                        response: count
                    });
                    return;
                }
                res.send({
                    response: count
                });
            });
        });
    });
    app.listen(3000);
    console.log("app > listening port 3000...");
});