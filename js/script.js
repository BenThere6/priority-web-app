var item_one = document.getElementById('item_one');
var item_two = document.getElementById('item_two');
var entered_item = document.getElementById('list_items')
var doneBtn = document.getElementById('done');
var unorganized_list = [];
var comparisons = [];
var to_compare = [];
var pointsObject = {};
var savedChoices = {};
var y;
var priority;
var numComparisons;
var item;

const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    unorganized_list.push(entered_item.value);
    entered_item.value='';
});

doneBtn.addEventListener('click', function() {
    randomizeComparisons()
    y = 0;
    pointsInit();
    compare();
});

item_one.addEventListener('click', function() {
    priority = 1;
    if (y<comparisons.length) {
        pointsKeeper();
        savedChoices[item] = to_compare[0];
        console.log('savedChoices:')
        console.log(savedChoices)
        y++;
        if (y<comparisons.length) {
            compare();
        }
    } 
});

item_two.addEventListener('click', function() {
    priority = 2;
    if (y<comparisons.length) {
        pointsKeeper();
        savedChoices[item] = to_compare[1];
        y++;
        if (y<comparisons.length) {
            compare();
        }
    } 
});

function randomizeComparisons() {
    length = unorganized_list.length;
    x = 0;
    while (x != length) {
        y = x + 1;
        while (y != length) {
            if (x != y) {
                comparisons.push(unorganized_list[x] + ',' + unorganized_list[y])
            }
            y += 1;
        }
        x += 1;
    }
    comparisons = comparisons.sort((a, b) => 0.5 - Math.random());
    numComparisons = comparisons.length;
    console.log("randomized comparions:")
    console.log(comparisons)
};

function compare() {
    item = comparisons[y];
    to_compare = item.split(',');
    item_one.textContent = to_compare[0];
    item_two.textContent = to_compare[1];
};

function pointsInit() {
    for (i=0;i<unorganized_list.length;i++) {
        pointsObject[unorganized_list[i]] = 0;
    }
}

function pointsKeeper() {
    if (priority == 1) {
        pointsObject[to_compare[0]] += 100;
    } else {
        pointsObject[to_compare[1]] += 100;
    }
    console.log(pointsObject);
};

function tiebreakers() {
    var noTies = false;
    while (!noTies) {
        noTies = true;
        for (i=0;i<pointsObject.length;i++) {
            x = pointsObject[i];
            for (j=0;j<pointsObject.length;j++) {
                y = pointsObject[j];
                if (x != y) {
                    if (pointsObject[x] == pointsObject[y]) {
                        noTies = false;
                        var comparison = x+','+y;
                        var mirrorComparison = y+','+x;
                        if (savedChoices.includes(comparison)) {
                            choice = savedChoices[comparison];
                            pointsObject[choice] += 1;
                        } else if (savedChoices.includes(mirrorComparison)) {
                            choice = savedChoices[mirrorComparison];
                            pointsObject[choice] += 1;
                        }
                    }
                }
            }
        }
    }
}

