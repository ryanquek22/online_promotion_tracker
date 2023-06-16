function createTimeSectionWithId (idName) {
    var segmentOverlayTop = document.createElement("div")
    segmentOverlayTop.classList.add("segment-overlay-top")
    

    var segementOverlayBottom = document.createElement("div")
    segementOverlayBottom.classList.add("segment-overlay-bottom")
    

    var segmentOverlay = document.createElement("div")
    segmentOverlay.classList.add("segment-overlay")
    
    segmentOverlay.append(segmentOverlayTop)
    segmentOverlay.append(segementOverlayBottom)

    var segmentDisplayTop = document.createElement("div")
    segmentDisplayTop.classList.add("segment-display-top")
    

    var segmentDisplayBottom = document.createElement("div")
    segmentDisplayBottom.classList.add("segment-display-bottom")
    

    var segmentDisplay = document.createElement("div")
    segmentDisplay.classList.add("segment-display")
    segmentDisplay.append(segmentDisplayTop)
    segmentDisplay.append(segmentDisplayBottom)
    segmentDisplay.append(segmentOverlay)

    var timeSegment = document.createElement("div")
    timeSegment.classList.add("time-segment")
    timeSegment.append(segmentDisplay)

    var timeGroup = document.createElement("div")
    timeGroup.classList.add("time-group")
    timeGroup.append(timeSegment)

    var TimeSection = document.createElement("div")
    TimeSection.classList.add("time-section")
    TimeSection.setAttribute("id", idName)
    TimeSection.append(timeGroup)

    return TimeSection;
}

function getTimeSegmentElements(segmentElement) {
    const segmentDisplay = segmentElement.querySelector('.segment-display');
    
    const segmentDisplayTop = segmentDisplay.querySelector('.segment-display-top');
    
    const segmentDisplayBottom= segmentDisplay.querySelector('.segment-display-bottom');
    
    const segmentOverlay = segmentDisplay.querySelector('.segment-overlay');
    
    const segmentOverlayTop = segmentOverlay.querySelector('.segment-overlay-top');
    
    const segmentOverlayBottom = segmentOverlay.querySelector('.segment-overlay-bottom');
    
    return {
        segmentDisplayTop,
        segmentDisplayBottom,
        segmentOverlay,
        segmentOverlayTop,
        segmentOverlayBottom,
    }
}

function updateSegmentValues(displayElement, overlayElement, value) {
    displayElement.textContent = value;
    overlayElement.textContent = value;
}

function updateTimeSegment(segmentElement, timeValue) {
    const segmentElements = getTimeSegmentElements(segmentElement);

    if (parseInt(segmentElements.segmentDisplayTop.textContent, 10) === timeValue) {
        return;
    }

    segmentElements.segmentOverlay.classList.add('flip');

    updateSegmentValues(
        segmentElements.segmentDisplayTop,
        segmentElements.segmentOverlayBottom,
        timeValue
    );

    function finishAnimation() {
        segmentElements.segmentOverlay.classList.remove('flip');
        updateSegmentValues(
            segmentElements.segmentDisplayBottom,
            segmentElements.segmentOverlayTop,
            timeValue
        );

        this.removeEventListener('animationend', finishAnimation);
    }

    segmentElements.segmentOverlay.addEventListener('animationend', finishAnimation)
}

function updateTimeSection(sectionId, timeValue) {
    const firstNumber = Math.floor(timeValue / 10);
    const secondNumber = timeValue % 10;

    const sectionElement = document.getElementById(sectionId);
    const timeSegments = sectionElement.querySelectorAll('.time-segment');
   updateTimeSegment(timeSegments[0], timeValue);
}

function getTimeRemainig(targetDateTime) {
    const nowTime = Date.now();
    const secondsRemainig = targetDateTime - nowTime;

    const complete = nowTime >= targetDateTime;

    if (complete) {
        return {
            complete,
            d : 0,
            h: 0,
            m: 0,
            s: 0
        };
    }
    const diff = secondsRemainig;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24))
    const h = Math.floor((diff / (1000 * 60 * 60 )) % 24) 
    const m = Math.floor((diff / (1000 * 60)) % 60)
    const s = Math.floor((diff/ (1000) % 60))

    return {
        complete,
        d,
        h,
        m,
        s
    }
}

function updateAllSegments () {
    //const targetTimeStamp = new Date(targetDate).getTime();
    const targetTimeStamp = eventDate_ms;
    const timeRemmainigBits = getTimeRemainig(targetTimeStamp);

    updateTimeSection('day', timeRemmainigBits.d);
    updateTimeSection('hour', timeRemmainigBits.h);
    updateTimeSection('min', timeRemmainigBits.m);
    updateTimeSection('sec', timeRemmainigBits.s);

    return timeRemmainigBits.complete;
}

const eventDate_ms = 1687492798714;
var dayTimeSection = createTimeSectionWithId("day") 
var hourTimeSection = createTimeSectionWithId("hour")
var minTimeSection = createTimeSectionWithId("min")
var secTimeSection = createTimeSectionWithId("sec")

const countdownBox = document.getElementById('countdown-box')
countdownBox.append(dayTimeSection)
countdownBox.append(hourTimeSection)
countdownBox.append(minTimeSection)
countdownBox.append(secTimeSection)

const countdownTimer = setInterval(() => {

    const isComplete = updateAllSegments();

    if (isComplete) {
        clearInterval(countdownTimer);
    }
    
}, 1000);

updateAllSegments();
