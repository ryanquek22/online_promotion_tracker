console.log('hello world')

const eventBox = document.getElementById('event-box')

const countdownBox = document.getElementById('countdown-box')

var daysElement = document.createElement("div")
daysElement = setAttribute("id", "days-counter")
daysElement.classList.add("flip-box-days")

var hoursElement = document.createElement("div")
hoursElement = setAttribute("id", "hours-counter")
hoursElement.classList.add("flip-box-hours")

var minsElement = document.createElement("div")
minsElement = setAttribute("id", "mins-counter")
minsElement.classList.add("flip-box-mins")

var secsElement = document.createElement("div")
secsElement = setAttribute("id", "secs-counter")
secsElement.classList.add("flip-box-secs")

countdownBox.append(daysElement)
countdownBox.append(hoursElement)
countdownBox.append(minsElement)
countdownBox.append(secsElement)

//console.log(typeof parseInt(eventBox.innerHTML))
//console.log("after eventBox")
//const eventDate = Date.parse(eventBox.textContent)
const eventDate = parseInt(eventBox.innerHTML)
//console.log(eventDate)
console.log('after event date')

const myCountdown = setInterval(()=> {
    const now = new Date().getTime()
    //console.log(now)

    const diff = eventDate - now
    console.log('diff')
    console.log(diff)

    const d = Math.floor(eventDate / (1000 * 60 * 60 * 24) - (now / (1000 * 60 * 60 * 24)))
    //const d = Math.floor(diff / (1000 * 60 * 60 * 24))
    const h = Math.floor((eventDate / (1000 * 60 * 60) - (now / (1000 * 60 * 60 ))) % 24)
    //const h = Math.floor((diff / (1000 * 60 * 60 )) % 24) 
    const m = Math.floor((eventDate / (1000 * 60) - (now / (1000 * 60 ))) % 60)
    //m = Math.floor((diff / (1000 * 60)) % 60)
    const s = Math.floor((eventDate / (1000) - (now / (1000))) % 60)
    //s = Math.floor((diff / 1000) % 60)
    //console.log(s)
    
    //diff -= 1000
    if (diff > 0) {
        //countdownBox.innerHTML = d + " days, " + h + " hours, " + m + " mins, " + s + " seconds"
        daysElement.innerHTML = d
        hoursElement.innerHTML = h
        minsElement.innerHTML = m
        secsElement.innerHTML = s
    } else {
        clearInterval(myCountdown)
        countdownBox.innerHTML = "Promotion period is over. Sign up for an email notification to make sure you do not miss any promotions"
    }

}, 1000)

