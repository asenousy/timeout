export function isEqual(str1, str2) {
    return str1.trim().toLowerCase() === str2.trim().toLowerCase();
}

export function buildBlackList(users, venues) {
    return venues.reduce((blackList, { name: venueName, food, drinks: venueDrinks }) => {
        const blackUsers = users.reduce((list, { name: userName, wont_eat, drinks: UserDrinks }) => {
            const noFood = food.every(food => wont_eat.find(eat => isEqual(eat, food)));
            const noDrink = !venueDrinks.some(drink => UserDrinks.find(userDrink => isEqual(userDrink, drink)));
            if (noFood || noDrink) list.push({ name: userName, noFood, noDrink });
            return list;
        }, []);
        blackUsers.length && blackList.push({ name: venueName, users: blackUsers });
        return blackList;
    }, []);
}
