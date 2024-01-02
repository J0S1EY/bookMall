const fruits = [
    {
        "name": "Persimmon",
        "img":"https://freepngimg.com/thumb/persimmon/1-2-persimmon-png.png",
        "id": 52,
        "family": "Ebenaceae",
        "order": "Rosales",
        "genus": "Diospyros",
        "nutritions": {
            "calories": 81,
            "fat": 0.0,
            "sugar": 18.0,
            "carbohydrates": 18.0,
            "protein": 0.0
        }
    },
    {
        "name": "Strawberry",
        "img":"https://freepngimg.com/thumb/strawberry/1-strawberry-png-images.png",
        "id": 3,
        "family": "Rosaceae",
        "order": "Rosales",
        "genus": "Fragaria",
        "nutritions": {
            "calories": 29,
            "fat": 0.4,
            "sugar": 5.4,
            "carbohydrates": 5.5,
            "protein": 0.8
        }
    },
    {
        "name": "Banana",
        "img":"https://cdn.pixabay.com/photo/2014/04/03/11/07/bananas-311788_640.png",
        "id": 1,
        "family": "Musaceae",
        "order": "Zingiberales",
        "genus": "Musa",
        "nutritions": {
            "calories": 96,
            "fat": 0.2,
            "sugar": 17.2,
            "carbohydrates": 22.0,
            "protein": 1.0
        }
    },
    {
        "name": "Tomato",
        "img":"https://cdn.pixabay.com/photo/2017/07/17/21/58/tomato-2514018_640.png",
        "id": 5,
        "family": "Solanaceae",
        "order": "Solanales",
        "genus": "Solanum",
        "nutritions": {
            "calories": 74,
            "fat": 0.2,
            "sugar": 2.6,
            "carbohydrates": 3.9,
            "protein": 0.9
        }
    },
    {
        "name": "Pear",
        "img":"https://cdn.pixabay.com/photo/2019/10/29/14/13/illustration-4587031_1280.png",
        "id": 4,
        "family": "Rosaceae",
        "order": "Rosales",
        "genus": "Pyrus",
        "nutritions": {
            "calories": 57,
            "fat": 0.1,
            "sugar": 10.0,
            "carbohydrates": 15.0,
            "protein": 0.4
        }
    },
    {
        "name": "Durian",
        "img":"https://cdn.pixabay.com/photo/2013/07/12/19/24/durian-fruit-154723_640.png",
        
        "id": 60,
        "family": "Malvaceae",
        "order": "Malvales",
        "genus": "Durio",
        "nutritions": {
            "calories": 147,
            "fat": 5.3,
            "sugar": 6.75,
            "carbohydrates": 27.1,
            "protein": 1.5
        }
    },
    {
        "name": "Blackberry",
        "img":"https://cdn.pixabay.com/photo/2017/02/01/10/24/blackberry-2029455_640.png",
        "id": 64,
        "family": "Rosaceae",
        "order": "Rosales",
        "genus": "Rubus",
        "nutritions": {
            "calories": 40,
            "fat": 0.4,
            "sugar": 4.5,
            "carbohydrates": 9.0,
            "protein": 1.3
        }
    },
    {
        "name": "Lingonberry",
        "img":"https://cdn.pixabay.com/photo/2021/12/15/08/04/cranberries-6872044_640.png",
        "id": 65,
        "family": "Ericaceae",
        "order": "Ericales",
        "genus": "Vaccinium",
        "nutritions": {
            "calories": 50,
            "fat": 0.34,
            "sugar": 5.74,
            "carbohydrates": 11.3,
            "protein": 0.75
        }
    },
    {
        "name": "Kiwi",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 66,
        "family": "Actinidiaceae",
        "order": "Struthioniformes",
        "genus": "Apteryx",
        "nutritions": {
            "calories": 61,
            "fat": 0.5,
            "sugar": 9.0,
            "carbohydrates": 15.0,
            "protein": 1.1
        }
    },
    {
        "name": "Lychee",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 67,
        "family": "Sapindaceae",
        "order": "Sapindales",
        "genus": "Litchi",
        "nutritions": {
            "calories": 66,
            "fat": 0.44,
            "sugar": 15.0,
            "carbohydrates": 17.0,
            "protein": 0.8
        }
    },
    {
        "name": "Pineapple",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 10,
        "family": "Bromeliaceae",
        "order": "Poales",
        "genus": "Ananas",
        "nutritions": {
            "calories": 50,
            "fat": 0.12,
            "sugar": 9.85,
            "carbohydrates": 13.12,
            "protein": 0.54
        }
    },
    {
        "name": "Fig",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 68,
        "family": "Moraceae",
        "order": "Rosales",
        "genus": "Ficus",
        "nutritions": {
            "calories": 74,
            "fat": 0.3,
            "sugar": 16.0,
            "carbohydrates": 19.0,
            "protein": 0.8
        }
    },
    {
        "name": "Gooseberry",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 69,
        "family": "Grossulariaceae",
        "order": "Saxifragales",
        "genus": "Ribes",
        "nutritions": {
            "calories": 44,
            "fat": 0.6,
            "sugar": 0.0,
            "carbohydrates": 10.0,
            "protein": 0.9
        }
    },
    {
        "name": "Passionfruit",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 70,
        "family": "Passifloraceae",
        "order": "Malpighiales",
        "genus": "Passiflora",
        "nutritions": {
            "calories": 97,
            "fat": 0.7,
            "sugar": 11.2,
            "carbohydrates": 22.4,
            "protein": 2.2
        }
    },
    {
        "name": "Plum",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 71,
        "family": "Rosaceae",
        "order": "Rosales",
        "genus": "Prunus",
        "nutritions": {
            "calories": 46,
            "fat": 0.28,
            "sugar": 9.92,
            "carbohydrates": 11.4,
            "protein": 0.7
        }
    },
    {
        "name": "Orange",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 2,
        "family": "Rutaceae",
        "order": "Sapindales",
        "genus": "Citrus",
        "nutritions": {
            "calories": 43,
            "fat": 0.2,
            "sugar": 8.2,
            "carbohydrates": 8.3,
            "protein": 1.0
        }
    },
    {
        "name": "GreenApple",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 72,
        "family": "Rosaceae",
        "order": "Rosales",
        "genus": "Malus",
        "nutritions": {
            "calories": 21,
            "fat": 0.1,
            "sugar": 6.4,
            "carbohydrates": 3.1,
            "protein": 0.4
        }
    },
    {
        "name": "Raspberry",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 23,
        "family": "Rosaceae",
        "order": "Rosales",
        "genus": "Rubus",
        "nutritions": {
            "calories": 53,
            "fat": 0.7,
            "sugar": 4.4,
            "carbohydrates": 12.0,
            "protein": 1.2
        }
    },
    {
        "name": "Watermelon",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 25,
        "family": "Cucurbitaceae",
        "order": "Cucurbitales",
        "genus": "Citrullus",
        "nutritions": {
            "calories": 30,
            "fat": 0.2,
            "sugar": 6.0,
            "carbohydrates": 8.0,
            "protein": 0.6
        }
    },
    {
        "name": "Lemon",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 26,
        "family": "Rutaceae",
        "order": "Sapindales",
        "genus": "Citrus",
        "nutritions": {
            "calories": 29,
            "fat": 0.3,
            "sugar": 2.5,
            "carbohydrates": 9.0,
            "protein": 1.1
        }
    },
    {
        "name": "Mango",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 27,
        "family": "Anacardiaceae",
        "order": "Sapindales",
        "genus": "Mangifera",
        "nutritions": {
            "calories": 60,
            "fat": 0.38,
            "sugar": 13.7,
            "carbohydrates": 15.0,
            "protein": 0.82
        }
    },
    {
        "name": "Blueberry",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 33,
        "family": "Rosaceae",
        "order": "Rosales",
        "genus": "Fragaria",
        "nutritions": {
            "calories": 29,
            "fat": 0.4,
            "sugar": 5.4,
            "carbohydrates": 5.5,
            "protein": 0.0
        }
    },
    {
        "name": "Apple",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 6,
        "family": "Rosaceae",
        "order": "Rosales",
        "genus": "Malus",
        "nutritions": {
            "calories": 52,
            "fat": 0.4,
            "sugar": 10.3,
            "carbohydrates": 11.4,
            "protein": 0.3
        }
    },
    {
        "name": "Guava",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 37,
        "family": "Myrtaceae",
        "order": "Myrtales",
        "genus": "Psidium",
        "nutritions": {
            "calories": 68,
            "fat": 1.0,
            "sugar": 9.0,
            "carbohydrates": 14.0,
            "protein": 2.6
        }
    },
    {
        "name": "Apricot",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 35,
        "family": "Rosaceae",
        "order": "Rosales",
        "genus": "Prunus",
        "nutritions": {
            "calories": 15,
            "fat": 0.1,
            "sugar": 3.2,
            "carbohydrates": 3.9,
            "protein": 0.5
        }
    },
    {
        "name": "Papaya",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 42,
        "family": "Caricaceae",
        "order": "Caricacea",
        "genus": "Carica",
        "nutritions": {
            "calories": 43,
            "fat": 0.4,
            "sugar": 1.0,
            "carbohydrates": 11.0,
            "protein": 0.0
        }
    },
    {
        "name": "Melon",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 41,
        "family": "Cucurbitaceae",
        "order": "Cucurbitaceae",
        "genus": "Cucumis",
        "nutritions": {
            "calories": 34,
            "fat": 0.0,
            "sugar": 8.0,
            "carbohydrates": 8.0,
            "protein": 0.0
        }
    },
    {
        "name": "Tangerine",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 77,
        "family": "Rutaceae",
        "order": "Sapindales",
        "genus": "Citrus",
        "nutritions": {
            "calories": 45,
            "fat": 0.4,
            "sugar": 9.1,
            "carbohydrates": 8.3,
            "protein": 0.0
        }
    },
    {
        "name": "Pitahaya",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 78,
        "family": "Cactaceae",
        "order": "Caryophyllales",
        "genus": "Cactaceae",
        "nutritions": {
            "calories": 36,
            "fat": 0.4,
            "sugar": 3.0,
            "carbohydrates": 7.0,
            "protein": 1.0
        }
    },
    {
        "name": "Lime",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 44,
        "family": "Rutaceae",
        "order": "Sapindales",
        "genus": "Citrus",
        "nutritions": {
            "calories": 25,
            "fat": 0.1,
            "sugar": 1.7,
            "carbohydrates": 8.4,
            "protein": 0.3
        }
    },
    {
        "name": "Pomegranate",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 79,
        "family": "Lythraceae",
        "order": "Myrtales",
        "genus": "Punica",
        "nutritions": {
            "calories": 83,
            "fat": 1.2,
            "sugar": 13.7,
            "carbohydrates": 18.7,
            "protein": 1.7
        }
    },
    {
        "name": "Dragonfruit",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 80,
        "family": "Cactaceae",
        "order": "Caryophyllales",
        "genus": "Selenicereus",
        "nutritions": {
            "calories": 60,
            "fat": 1.5,
            "sugar": 8.0,
            "carbohydrates": 9.0,
            "protein": 9.0
        }
    },
    {
        "name": "Grape",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 81,
        "family": "Vitaceae",
        "order": "Vitales",
        "genus": "Vitis",
        "nutritions": {
            "calories": 69,
            "fat": 0.16,
            "sugar": 16.0,
            "carbohydrates": 18.1,
            "protein": 0.72
        }
    },
    {
        "name": "Morus",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 82,
        "family": "Moraceae",
        "order": "Rosales",
        "genus": "Morus",
        "nutritions": {
            "calories": 43,
            "fat": 0.39,
            "sugar": 8.1,
            "carbohydrates": 9.8,
            "protein": 1.44
        }
    },
    {
        "name": "Feijoa",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 76,
        "family": "Myrtaceae",
        "order": "Myrtoideae",
        "genus": "Sellowiana",
        "nutritions": {
            "calories": 44,
            "fat": 0.4,
            "sugar": 3.0,
            "carbohydrates": 8.0,
            "protein": 0.6
        }
    },
    {
        "name": "Avocado",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 84,
        "family": "Lauraceae",
        "order": "Laurales",
        "genus": "Persea",
        "nutritions": {
            "calories": 160,
            "fat": 14.66,
            "sugar": 0.66,
            "carbohydrates": 8.53,
            "protein": 2.0
        }
    },
    {
        "name": "Kiwifruit",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 85,
        "family": "Actinidiaceae",
        "order": "Ericales",
        "genus": "Actinidia",
        "nutritions": {
            "calories": 61,
            "fat": 0.5,
            "sugar": 8.9,
            "carbohydrates": 14.6,
            "protein": 1.14
        }
    },
    {
        "name": "Cranberry",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 87,
        "family": "Ericaceae",
        "order": "Ericales",
        "genus": "Vaccinium",
        "nutritions": {
            "calories": 46,
            "fat": 0.1,
            "sugar": 4.0,
            "carbohydrates": 12.2,
            "protein": 0.4
        }
    },
    {
        "name": "Cherry",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 9,
        "family": "Rosaceae",
        "order": "Rosales",
        "genus": "Prunus",
        "nutritions": {
            "calories": 50,
            "fat": 0.3,
            "sugar": 8.0,
            "carbohydrates": 12.0,
            "protein": 1.0
        }
    },
    {
        "name": "Peach",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 86,
        "family": "Rosaceae",
        "order": "Rosales",
        "genus": "Prunus",
        "nutritions": {
            "calories": 39,
            "fat": 0.25,
            "sugar": 8.4,
            "carbohydrates": 9.5,
            "protein": 0.9
        }
    },
    {
        "name": "Jackfruit",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 94,
        "family": "Moraceae",
        "order": "Rosales",
        "genus": "Artocarpus",
        "nutritions": {
            "calories": 95,
            "fat": 0.0,
            "sugar": 19.1,
            "carbohydrates": 23.2,
            "protein": 1.72
        }
    },
    {
        "name": "Horned Melon",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 95,
        "family": "Cucurbitaceae",
        "order": "Cucurbitales",
        "genus": "Cucumis",
        "nutritions": {
            "calories": 44,
            "fat": 1.26,
            "sugar": 0.5,
            "carbohydrates": 7.56,
            "protein": 1.78
        }
    },
    {
        "name": "Hazelnut",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 96,
        "family": "Betulaceae",
        "order": "Fagales",
        "genus": "Corylus",
        "nutritions": {
            "calories": 628,
            "fat": 61.0,
            "sugar": 4.3,
            "carbohydrates": 17.0,
            "protein": 15.0
        }
    },
    {
        "name": "Pomelo",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 98,
        "family": "Rutaceae",
        "order": "Sapindales",
        "genus": "Citrus",
        "nutritions": {
            "calories": 37,
            "fat": 0.0,
            "sugar": 8.5,
            "carbohydrates": 9.67,
            "protein": 0.82
        }
    },
    {
        "name": "Mangosteen",
        "img":"https://cdn.pixabay.com/photo/2012/04/26/19/33/kiwi-42895_1280.png",
        "id": 99,
        "family": "Clusiaceae",
        "order": "Malpighiales",
        "genus": "Garcinia",
        "nutritions": {
            "calories": 73,
            "fat": 0.58,
            "sugar": 16.11,
            "carbohydrates": 17.91,
            "protein": 0.41
        }
    }
]

module.exports = fruits