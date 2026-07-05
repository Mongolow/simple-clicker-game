var x = 0;
var multi = 1;
var click_upgrade_cost = 10;
var boost_clicks = 0;
var boost_click_cost = 100;

function add_number() {
    if (boost_clicks > 0) {
        boost_clicks = boost_clicks - 1;
        x = x + multi * 10;
        document.getElementById('boost_clicks').innerHTML = "remaining boost clicks: " + boost_clicks;
        document.getElementById('counter').innerHTML = x;
    } else {
        x = x + multi;
        document.getElementById('counter').innerHTML = x;
    }
}

function restart() {
    x = 0;
    multi = 1;
    click_upgrade_cost = 10;
    boost_clicks = 0;
    boost_click_cost = 100;
    document.getElementById('boost_clicks').innerHTML = "remaining boost clicks: " + boost_clicks;
    document.getElementById('boost_click_cost').innerHTML = "cost: " + boost_click_cost;
    document.getElementById('counter').innerHTML = x;
    document.getElementById('current_multiplyer').innerHTML = "current click power: " + multi;
    document.getElementById('click_upgrade_cost').innerHTML = "cost:" + " " + click_upgrade_cost;
}

function click_upgrade() {
    if (x >= click_upgrade_cost) {
        x = x - click_upgrade_cost;
        multi = multi * 2;
        document.getElementById('counter').innerHTML = x;
        document.getElementById('current_multiplyer').innerHTML = "current click power: " + multi;
        click_upgrade_cost = click_upgrade_cost * 2.2;
        click_upgrade_cost = Math.round(click_upgrade_cost);
        document.getElementById('click_upgrade_cost').innerHTML = "cost:" + " " + click_upgrade_cost;
    } else {
        alert("not enough money");
    }
}

function boost_click() {
    if (x >= boost_click_cost) {
        x = x - boost_click_cost;
        boost_click_cost = boost_click_cost * 2.5 + click_upgrade_cost;
        boost_click_cost = Math.round(boost_click_cost);
        document.getElementById('boost_click_cost').innerHTML = "cost: " + " " + boost_click_cost;
        boost_clicks = boost_clicks + 5;
        document.getElementById('counter').innerHTML = x;
        document.getElementById('boost_clicks').innerHTML = "remaining boost clicks: " + boost_clicks;
    } else {
        alert("not enough money");
    }
}
