var x = 0;
var multi = 1;
var click_upgrade_cost = 10;
var boost_clicks = 0;
var boost_click_cost = 100;
var autoclicker_cost = 100000;
var autoclicker_interval = null;
var auto_clicker_upgrade = 0;
var autoclicker_maxed = false;
var autoclicker_timer_id = null;
var autoclicker_base_interval = 10000;
var autoclicker_min_interval = 100;
var autoclicker_start_upgrade_value = 100;
var autoclicker_upgrade_value = autoclicker_start_upgrade_value;
const SAVE_KEY = "clicker_game_save";

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
    if (autoclicker_timer_id !== null) {
        clearInterval(autoclicker_timer_id);
        autoclicker_timer_id = null;
    }
    
    x = 0;
    multi = 1;
    click_upgrade_cost = 10;
    boost_clicks = 0;
    boost_click_cost = 100;
    autoclicker_cost = 100000;
    auto_clicker_upgrade = 0;
    autoclicker_upgrade_value = autoclicker_start_upgrade_value;
    autoclicker_interval = null;
    autoclicker_maxed = false;
    document.getElementById('boost_clicks').innerHTML = "remaining boost clicks: " + boost_clicks;
    document.getElementById('boost_click_cost').innerHTML = "cost: " + boost_click_cost;
    document.getElementById('autoclicker_cost').innerHTML = "cost: " + autoclicker_cost;
    document.getElementById('autoclicker_interval').innerHTML = "autoclicker interval: " + autoclicker_interval;
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
        boost_click_cost = boost_click_cost * 3;
        boost_click_cost = Math.round(boost_click_cost);
        document.getElementById('boost_click_cost').innerHTML = "cost: " + " " + boost_click_cost;
        boost_clicks = boost_clicks + 5;
        document.getElementById('counter').innerHTML = x;
        document.getElementById('boost_clicks').innerHTML = "remaining boost clicks: " + boost_clicks;
    } else {
        alert("not enough money");
    }
}

function auto_click_upgrade() {
    if (autoclicker_base_interval - auto_clicker_upgrade <= autoclicker_min_interval) {
        autoclicker_maxed = true;
        document.getElementById('autoclicker_cost').innerHTML = "cost: maxed out";
        alert("autoclicker is maxed out");
        return;
    }

    autoclicker_maxed = false;

    if (x < autoclicker_cost) {
        alert("not enough money");
        return;
    }

    auto_clicker_upgrade = auto_clicker_upgrade + autoclicker_upgrade_value;
    autoclicker_upgrade_value = autoclicker_upgrade_value * 1.5;
    autoclicker_upgrade_value = Math.round(autoclicker_upgrade_value);
    x = x - autoclicker_cost;
    autoclicker_cost = autoclicker_cost * 2.5;
    autoclicker_cost = Math.round(autoclicker_cost);

    autoclicker_interval = autoclicker_base_interval - auto_clicker_upgrade;
    if (autoclicker_interval <= autoclicker_min_interval) {
        autoclicker_interval = autoclicker_min_interval;
        auto_clicker_upgrade = autoclicker_base_interval - autoclicker_min_interval;
        autoclicker_maxed = true;
        document.getElementById('autoclicker_cost').innerHTML = "cost: maxed out";
    } else {
        document.getElementById('autoclicker_cost').innerHTML = "cost: " + " " + autoclicker_cost;
    }

    if (autoclicker_timer_id !== null) {
        clearInterval(autoclicker_timer_id);
    }
    autoclicker_timer_id = setInterval(add_number, autoclicker_interval);

    document.getElementById('counter').innerHTML = x;
    document.getElementById('autoclicker_interval').innerHTML = "autoclicker interval: " + autoclicker_interval + "ms";
}

function saveGame() {
  const state = {
    x,
    multi,
    click_upgrade_cost,
    boost_clicks,
    boost_click_cost,
    autoclicker_cost,
    auto_clicker_upgrade,
    autoclicker_interval,
    autoclicker_maxed,
    autoclicker_upgrade_value
  };
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

function loadGame() {
  const savedState = localStorage.getItem(SAVE_KEY);
  if (!savedState) return;

  try {
    const state = JSON.parse(savedState);
    x = state.x;
    multi = state.multi;
    click_upgrade_cost = state.click_upgrade_cost;
    boost_clicks = state.boost_clicks;
    boost_click_cost = state.boost_click_cost;
    autoclicker_cost = state.autoclicker_cost;
    auto_clicker_upgrade = state.auto_clicker_upgrade;
    autoclicker_interval = state.autoclicker_interval;
    autoclicker_maxed = state.autoclicker_maxed;
    autoclicker_upgrade_value = state.autoclicker_upgrade_value;

    document.getElementById('counter').innerHTML = x;
    document.getElementById('current_multiplyer').innerHTML = "current click power: " + multi;
    document.getElementById('click_upgrade_cost').innerHTML = "cost:" + " " + click_upgrade_cost;
    document.getElementById('boost_clicks').innerHTML = "remaining boost clicks: " + boost_clicks;
    document.getElementById('boost_click_cost').innerHTML = "cost: " + " " + boost_click_cost;
    document.getElementById('autoclicker_cost').innerHTML = "cost: " + " " + autoclicker_cost;
    document.getElementById('autoclicker_interval').innerHTML = "autoclicker interval: " + autoclicker_interval + "ms";

    if (autoclicker_interval !== null) {
      if (autoclicker_timer_id !== null) {
        clearInterval(autoclicker_timer_id);
      }
      autoclicker_timer_id = setInterval(add_number, autoclicker_interval);
    }
  } catch (error) {
    console.error("Failed to load game state:", error);
  }
}