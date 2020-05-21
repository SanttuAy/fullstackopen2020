const listHelper = require('../utils/list_helper')

describe('dummy-testit', () => {
    test('dummy returns one', () => {
      const blogs1 = []
      const result = listHelper.dummy(blogs1)
      expect(result).toBe(1)
    })
})


describe('totalLikes-testit', () => {
    const yhdenBloginLista = [
        {
        _id: '5ec2a1914288794a78296c4a',
        title: "Ruokajuttuja",
        author: "Tove",
        url: "osoite/kuin/osoite",
        likes: 18,
        __v: 0
        }
    ]

    test('jos listassa 1 blogi, palauta sen likes-arvo', () => {
        const tulos = listHelper.totalLikes(yhdenBloginLista)
        console.log(`tulos oli ${tulos}`)
        expect(tulos).toBe(18)
    }) 

    const tyhjaLista = []
    test('tyhjasta listasta palautetaan 0', () => {
        const tulos = listHelper.totalLikes(tyhjaLista)
        expect(tulos).toBe(0)
    }) 

    const blogs = [ 
        { 
            _id: "5a422a851b54a676234d17f7", 
            title: "React patterns", 
            author: "Michael Chan", 
            url: "https://reactpatterns.com/", 
            likes: 7, 
            __v: 0 
        }, 
        { 
            _id: "5a422aa71b54a676234d17f8", 
            title: "Go To Statement Considered Harmful", 
            author: "Edsger W. Dijkstra", 
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
            likes: 5, 
            __v: 0 
        }, 
        { 
            _id: "5a422b3a1b54a676234d17f9", 
            title: "Canonical string reduction", 
            author: "Edsger W. Dijkstra", 
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
            likes: 12,
            __v: 0 
        }, 
        { 
            _id: "5a422b891b54a676234d17fa", 
            title: "First class tests", 
            author: "Robert C. Martin", 
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
            likes: 10, 
            __v: 0 
        }, 
        { 
            _id: "5a422ba71b54a676234d17fb", 
            title: "TDD harms architecture", 
            author: "Robert C. Martin", 
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
            likes: 0, 
            __v: 0 
        }, 
        { 
            _id: "5a422bc61b54a676234d17fc", 
            title: "Type wars", 
            author: "Robert C. Martin", 
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
            likes: 2, 
            __v: 0 
        }
    ]
    test('perusyhteenlasku toimii', () => {
        console.log("testattavien blogien likes-arvot: " +  blogs.map((blogi) => blogi.likes))
        debugger
        const tulos = listHelper.totalLikes(blogs)
        console.log("testin ajaman koodin tulos: " +  tulos)
        expect(tulos).toBe(36)
    }) 
}) 

describe('suosikkiblogin-testit', () => {
    const blogs = [ 
        { 
            _id: "5a422a851b54a676234d17f7", 
            title: "React patterns", 
            author: "Michael Chan", 
            url: "https://reactpatterns.com/", 
            likes: 7, 
            __v: 0 
        }, 
        { 
            _id: "5a422aa71b54a676234d17f8", 
            title: "Go To Statement Considered Harmful", 
            author: "Edsger W. Dijkstra", 
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
            likes: 5, 
            __v: 0 
        }, 
        { 
            _id: "5a422b3a1b54a676234d17f9", 
            title: "Canonical string reduction", 
            author: "Edsger W. Dijkstra", 
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
            likes: 12,
            __v: 0 
        }, 
        { 
            _id: "5a422b891b54a676234d17fa", 
            title: "First class tests", 
            author: "Robert C. Martin", 
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
            likes: 10, 
            __v: 0 
        }, 
        { 
            _id: "5a422ba71b54a676234d17fb", 
            title: "TDD harms architecture", 
            author: "Robert C. Martin", 
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
            likes: 0, 
            __v: 0 
        }, 
        { 
            _id: "5a422bc61b54a676234d17fc", 
            title: "Type wars", 
            author: "Robert C. Martin", 
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
            likes: 2, 
            __v: 0 
        }
    ]
    test('suosikki se jolla suurin likes-arvo', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({ 
            _id: "5a422b3a1b54a676234d17f9", 
            title: "Canonical string reduction", 
            author: "Edsger W. Dijkstra", 
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
            likes: 12,
            __v: 0 
        })
      })
    
    const yhdenBloginLista = [
       {
       _id: '5ec2a1914288794a78296c4a',
       title: "Ruokajuttuja",
       author: "Tove",
       url: "osoite/kuin/osoite",
       likes: 18,
       __v: 0
       }
    ]
    test('1 blogin listan suosikki on se ainut blogi', () => {
        expect(listHelper.favoriteBlog(yhdenBloginLista)).toEqual({
            _id: '5ec2a1914288794a78296c4a',
            title: "Ruokajuttuja",
            author: "Tove",
            url: "osoite/kuin/osoite",
            likes: 18,
            __v: 0
            })
    })

    const tyhjaLista = []
    test('tyhjasta blogilistasta undefined-suosikki', () => {
        expect(listHelper.favoriteBlog(tyhjaLista)).toBe(undefined)
    })

    const ekaOnSuosituin = [ 
        { 
            _id: "5a422a851b54a676234d17f7", 
            title: "React patterns", 
            author: "Michael Chan", 
            url: "https://reactpatterns.com/", 
            likes: 77, 
            __v: 0 
        }, 
        { 
            _id: "5a422aa71b54a676234d17f8", 
            title: "Go To Statement Considered Harmful", 
            author: "Edsger W. Dijkstra", 
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
            likes: 5, 
            __v: 0 
        }, 
        { 
            _id: "5a422b3a1b54a676234d17f9", 
            title: "Canonical string reduction", 
            author: "Edsger W. Dijkstra", 
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
            likes: 12,
            __v: 0 
        }, 
        { 
            _id: "5a422b891b54a676234d17fa", 
            title: "First class tests", 
            author: "Robert C. Martin", 
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
            likes: 10, 
            __v: 0 
        }, 
        { 
            _id: "5a422ba71b54a676234d17fb", 
            title: "TDD harms architecture", 
            author: "Robert C. Martin", 
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
            likes: 0, 
            __v: 0 
        }, 
        { 
            _id: "5a422bc61b54a676234d17fc", 
            title: "Type wars", 
            author: "Robert C. Martin", 
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
            likes: 2, 
            __v: 0 
        }
    ]

    const vikaOnSuosituin = [ 
        { 
            _id: "5a422a851b54a676234d17f7", 
            title: "React patterns", 
            author: "Michael Chan", 
            url: "https://reactpatterns.com/", 
            likes: 7, 
            __v: 0 
        }, 
        { 
            _id: "5a422aa71b54a676234d17f8", 
            title: "Go To Statement Considered Harmful", 
            author: "Edsger W. Dijkstra", 
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
            likes: 5, 
            __v: 0 
        }, 
        { 
            _id: "5a422b3a1b54a676234d17f9", 
            title: "Canonical string reduction", 
            author: "Edsger W. Dijkstra", 
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
            likes: 12,
            __v: 0 
        }, 
        { 
            _id: "5a422b891b54a676234d17fa", 
            title: "First class tests", 
            author: "Robert C. Martin", 
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
            likes: 10, 
            __v: 0 
        }, 
        { 
            _id: "5a422ba71b54a676234d17fb", 
            title: "TDD harms architecture", 
            author: "Robert C. Martin", 
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
            likes: 0, 
            __v: 0 
        }, 
        { 
            _id: "5a422bc61b54a676234d17fc", 
            title: "Type wars", 
            author: "Robert C. Martin", 
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
            likes: 82, 
            __v: 0 
        }
    ]

        test('suurin suosikki ekana', () => {
            expect(listHelper.favoriteBlog(ekaOnSuosituin)).toEqual({ 
                _id: "5a422a851b54a676234d17f7", 
                title: "React patterns", 
                author: "Michael Chan", 
                url: "https://reactpatterns.com/", 
                likes: 77, 
                __v: 0 
            })
        })        

    test('suurin suosikki viimeisenä', () => {
            expect(listHelper.favoriteBlog(vikaOnSuosituin)).toEqual({ 
                _id: "5a422bc61b54a676234d17fc", 
                title: "Type wars", 
                author: "Robert C. Martin", 
                url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
                likes: 82, 
                __v: 0 
            })
        })        

})
