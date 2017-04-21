var BusinessListView = function (container) {
    this.container = container
}

BusinessListView.prototype.render = function (businesses) {

    while (this.container.hasChildNodes()) {
        this.container.removeChild(this.container.lastChild)
    }

    businesses.forEach(function (business) {
        var li = document.createElement("li")
        li.innerText = business.name
        this.container.appendChild(li)
    }.bind(this))
}

module.exports = BusinessListView