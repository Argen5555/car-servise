// src/data/mockData.js
export const mockServices = [
    { id: 1, diagnostic: true, price: 1200, status: "Доступно", name: "Полная диагностика", emoji: "🔧" },
    { id: 2, diagnostic: false, price: 800, status: "Доступно", name: "Замена масла", emoji: "🛢️" },
    { id: 3, diagnostic: true, price: 2500, status: "Доступно", name: "Ремонт двигателя", emoji: "⚙️" },
    { id: 4, diagnostic: false, price: 600, status: "Доступно", name: "Шиномонтаж", emoji: "🛞" },
    { id: 5, diagnostic: false, price: 900, status: "Доступно", name: "Замена тормозных колодок", emoji: "🛠️" },
    { id: 6, diagnostic: true, price: 1500, status: "Доступно", name: "Проверка и ремонт подвески", emoji: "🔩" },
    { id: 7, diagnostic: false, price: 700, status: "Доступно", name: "Балансировка колес", emoji: "⚖️" },
    { id: 8, diagnostic: true, price: 1800, status: "Доступно", name: "Компьютерная диагностика", emoji: "🖥️" },
];

export const mockMasters = [
    { id: 1, name: "Александр Петров", completedOrderIds: [1, 5, 12, 20], experience: "10 лет", specialty: "Двигатели" },
    { id: 2, name: "Дмитрий Волков", completedOrderIds: [2, 8, 15, 21], experience: "7 лет", specialty: "Электрика" },
    { id: 3, name: "Сергей Иванов", completedOrderIds: [3, 9, 18, 22], experience: "12 лет", specialty: "Трансмиссия" },
    { id: 4, name: "Елена Смирнова", completedOrderIds: [4, 10, 19, 23], experience: "8 лет", specialty: "Кузовные работы" },
];

export const reviews = [
    { id: 1, author: "Иван Петров", text: "Отличный сервис! Машину починили быстро и качественно. Очень доволен результатом и отношением к клиентам. Рекомендую!", rating: 5, avatar: "👨‍💼" },
    { id: 2, author: "Мария Соколова", text: "Доброжелательные мастера, цены приемлемые. Всегда помогают найти оптимальное решение. Отдельное спасибо за подробную консультацию.", rating: 5, avatar: "👩‍💼" },
    { id: 3, author: "Алексей Иванов", text: "Рекомендую! Сделали диагностику бесплатно, быстро нашли причину поломки. Очень профессиональный подход. Буду обращаться снова.", rating: 4, avatar: "👨‍🔧" },
    { id: 4, author: "Ольга Козлова", text: "Ремонт занял меньше времени, чем ожидала. Качество на высоте, машина теперь как новая. Спасибо CarService!", rating: 5, avatar: "👩‍🦳" },
    { id: 5, author: "Николай Федоров", text: "Быстро и без лишних вопросов устранили неисправность. Очень компетентные специалисты. Молодцы!", rating: 4, avatar: "👴" },
];