function Player(rating, name) {       // Accept name and rating in the constructor
    this.name = name || null;
    this.rating  = rating  || null;
}

Player.prototype.getrating = () => {
    return this.rating;
}

Player.prototype.setrating = (rating)  =>{
    this.rating = rating;
}

Player.prototype.getName = () => {
    return this.name;
}

Player.prototype.setName = (name) => {
    this.name = name;
}
//not sure if useful
Player.prototype.equals = (otherPlayer) => {
    return otherPlayer.getName() == this.getName()
        && otherPlayer.getrating() == this.getrating();
}

Player.prototype.fill = (newFields) => {
    for (var field in newFields) {
        if (this.hasOwnProperty(field) && newFields.hasOwnProperty(field)) {
            if (this[field] !== 'undefined') {
                this[field] = newFields[field];
            }
        }
    }
};

module.exports = Player; 