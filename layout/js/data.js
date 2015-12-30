var Graph = {
  nodes: [
    {
      id: 0,
      x: -50,
      y: 275,
      r: 0,
      fixed: true
    },
    {
      id: 1,
      x: -50,
      y: 125,
      r: 0,
      fixed: true
    },
    {
      id: 2,
      x: 60,
      y: -25,
      r: 0,
      fixed: true
    },
    {
      id: 3,
      x: 0,
      y: 550,
      r: 0,
      fixed: true
    },
    {
      id: 4,
      x: 80,
      y: 30,
      r: 15
    },
    {
      id: 5,
      x: 70,
      y: 240,
      r: 20
    },
    {
      id: 6,
      x: 230,
      y: 430,
      r: 15
    },
    {
      id: 7,
      x: 350,
      y: 280,
      r: 15
    },
    {
      id: 8,
      x: 290,
      y: 70,
      r: 15
    },
    {
      id: 9,
      x: 200,
      y: 195,
      r: 15
    },
    {
      id: 10,
      x: 15,
      y: 20,
      r: 6
    },
    {
      id: 11,
      x: 110,
      y: 100,
      r: 6
    },
    {
      id: 12,
      x: 130,
      y: 250,
      r: 6
    },
    {
      id: 13,
      x: 40,
      y: 130,
      r: 6
    },
    {
      id: 14,
      x: 12,
      y: 480,
      r: 6
    },
    {
      id: 15,
      x: 330,
      y: 465,
      r: 6
    },
    {
      id: 16,
      x: 250,
      y: -15,
      r: 0,
      fixed: true
    },
    {
      id: 17,
      x: 340,
      y: 270,
      r: 0,
      fixed: true
    },
    {
      id: 18,
      x: 200,
      y: 800,
      r: 0,
      fixed: true
    }
  ],
  links: [
    {
      source: 0,
      target: 1
    },
    {
      source: 0,
      target: 3
    },
    {
      source: 0,
      target: 14,
      z: 1
    },
    {
      source: 0,
      target: 5
    },
    {
      source: 1,
      target: 2
    },
    {
      source: 1,
      target: 4
    },
    {
      source: 1,
      target: 5
    },
    {
      source: 1,
      target: 10,
      z: 1
    },
    {
      source: 1,
      target: 13,
      z: 1
    },
    {
      source: 2,
      target: 4
    },
    {
      source: 2,
      target: 8
    },
    {
      source: 2,
      target: 10,
      z: 1
    },
    {
      source: 3,
      target: 14,
      z: 1
    },
    {
      source: 3,
      target: 6
    },
    {
      source: 4,
      target: 10,
      z: 1
    },
    {
      source: 4,
      target: 8
    },
    {
      source: 4,
      target: 11,
      z: 1
    },
    {
      source: 4,
      target: 13,
      z: 1
    },
    {
      source: 4,
      target: 5
    },
    {
      source: 5,
      target: 13,
      z: 1
    },
    {
      source: 5,
      target: 9
    },
    {
      source: 5,
      target: 6
    },
    {
      source: 5,
      target: 14,
      z: 1
    },
    {
      source: 6,
      target: 7
    },
    {
      source: 6,
      target: 15,
      z: 1
    },
    {
      source: 6,
      target: 14,
      z: 1
    },
    {
      source: 7,
      target: 15,
      z: 1
    },
    {
      source: 7,
      target: 12,
      z: 1
    },
    {
      source: 7,
      target: 9
    },
    {
      source: 7,
      target: 8
    },
    {
      source: 8,
      target: 11,
      z: 1
    },
    {
      source: 8,
      target: 9
    },
    {
      source: 9,
      target: 13,
      z: 1
    },
    {
      source: 9,
      target: 12,
      z: 1
    },
    {
      source: 10,
      target: 13,
      z: 1
    },
    {
      source: 11,
      target: 12,
      z: 1
    },
    {
      source: 12,
      target: 13,
      z: 1
    },
    {
      source: 12,
      target: 14,
      z: 1
    },
    {
      source: 15,
      target: 14,
      z: 1
    },
    {
      source: 16,
      target: 8
    },
    {
      source: 18,
      target: 6
    },
    {
      source: 12,
      target: 6,
      z: 1
    },
    {
      source: 15,
      target: 18,
      z: 1
    }
  ],
  //+360
  nodes2: [
    {
      id: 0,
      x: 410,
      y: 275,
      r: 0,
      fixed: true
    },
    {
      id: 1,
      x: 410,
      y: 125,
      r: 0,
      fixed: true
    },
    {
      id: 2,
      x: 300,
      y: -25,
      r: 0,
      fixed: true
    },
    {
      id: 3,
      x: 430,
      y: 700,
      r: 0,
      fixed: true
    },
    {
      id: 4,
      x: 280,
      y: 30,
      r: 15
    },
    {
      id: 5,
      x: 290,
      y: 240,
      r: 20
    },
    {
      id: 6,
      x: 100,
      y: 430,
      r: 15
    },
    {
      id: 7,
      x: 30,
      y: 280,
      r: 15
    },
    {
      id: 8,
      x: 70,
      y: 70,
      r: 15
    },
    {
      id: 9,
      x: 160,
      y: 195,
      r: 15
    },
    {
      id: 10,
      x: 345,
      y: 20,
      r: 6
    },
    {
      id: 11,
      x: 250,
      y: 100,
      r: 6
    },
    {
      id: 12,
      x: 250,
      y: 250,
      r: 6
    },
    {
      id: 13,
      x: 320,
      y: 130,
      r: 6
    },
    {
      id: 14,
      x: 308,
      y: 480,
      r: 6
    },
    {
      id: 15,
      x: 70,
      y: 465,
      r: 6
    },
    {
      id: 16,
      x: 110,
      y: -15,
      r: 0,
      fixed: true
    },
    {
      id: 17,
      x: 20,
      y: 70,
      r: 0,
      fixed: true
    },
    {
      id: 18,
      x: 270,
      y: 800,
      r: 0,
      fixed: true
    }
  ],
  links2: [
    {
      source: 0,
      target: 1
    },
    {
      source: 0,
      target: 3
    },
    {
      source: 0,
      target: 14,
      z: 1
    },
    {
      source: 0,
      target: 5
    },
    {
      source: 1,
      target: 2
    },
    {
      source: 1,
      target: 4
    },
    {
      source: 1,
      target: 5
    },
    {
      source: 1,
      target: 10,
      z: 1
    },
    {
      source: 1,
      target: 13,
      z: 1
    },
    {
      source: 2,
      target: 4
    },
    {
      source: 2,
      target: 8
    },
    {
      source: 2,
      target: 10,
      z: 1
    },
    {
      source: 3,
      target: 14,
      z: 1
    },
    {
      source: 3,
      target: 6
    },
    {
      source: 4,
      target: 10,
      z: 1
    },
    {
      source: 4,
      target: 8
    },
    {
      source: 4,
      target: 11,
      z: 1
    },
    {
      source: 4,
      target: 13,
      z: 1
    },
    {
      source: 4,
      target: 5
    },
    {
      source: 5,
      target: 13,
      z: 1
    },
    {
      source: 5,
      target: 9
    },
    {
      source: 5,
      target: 6
    },
    {
      source: 5,
      target: 14,
      z: 1
    },
    {
      source: 6,
      target: 7
    },
    {
      source: 6,
      target: 15,
      z: 1
    },
    {
      source: 6,
      target: 14,
      z: 1
    },
    {
      source: 7,
      target: 15,
      z: 1
    },
    {
      source: 7,
      target: 12,
      z: 1
    },
    {
      source: 7,
      target: 9
    },
    {
      source: 7,
      target: 8
    },
    {
      source: 8,
      target: 11,
      z: 1
    },
    {
      source: 8,
      target: 9
    },
    {
      source: 9,
      target: 13,
      z: 1
    },
    {
      source: 9,
      target: 12,
      z: 1
    },
    {
      source: 10,
      target: 13,
      z: 1
    },
    {
      source: 11,
      target: 12,
      z: 1
    },
    {
      source: 12,
      target: 13,
      z: 1
    },
    {
      source: 12,
      target: 14,
      z: 1
    },
    {
      source: 15,
      target: 14,
      z: 1
    },
    {
      source: 16,
      target: 8
    },
    {
      source: 18,
      target: 6
    },
    {
      source: 12,
      target: 6,
      z: 1
    },
    {
      source: 15,
      target: 18,
      z: 1
    }
  ]
};