var skilldata = {
  skills: [
    {
      id: 0,
      title: 'Чувство стиля',
      parent: null
    },
    {
      id: 1,
      title: 'Маскировка',
      parent: [0]
    },
    {
      id: 2,
      title: 'Звездная болезнь',
      parent: [0]
    },
    {
      id: 3,
      title: 'Абсолютное здоровье',
      parent: [1]
    },
    {
      id: 4,
      title: 'Приятный бонус',
      parent: [2]
    },
    {
      id: 5,
      title: 'Логистика',
      parent: [3]
    },
    {
      id: 6,
      title: 'Логистика',
      parent: [3, 4]
    },
    {
      id: 7,
      title: 'Логистика',
      parent: [4]
    },
    {
      id: 8,
      title: 'Общий сбор',
      parent: [5, 6]
    },
    {
      id: 9,
      title: 'Тусовка своих',
      parent: [6, 7]
    },
    {
      id: 10,
      title: 'Логистика',
      parent: [8, 9]
    }
  ]
}
