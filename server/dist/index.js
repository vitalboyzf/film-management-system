Object.defineProperty(exports, "__esModule", { value: true });
const Movie_1 = require("./entities/Movie");
const class_validator_1 = require("class-validator");
require("./test");
const m = new Movie_1.Movie();
m.name = "生死大逃杀";
m.types = ["惊悚"];
m.areas = ["北京", "廊坊"];
m.timeLong = 45;
m.isHot = true;
m.isComing = true;
if (true) {
    const a = 4 + 5;
    console.log(a);
}
class_validator_1.validate(m).then(err => {
    if (err.length !== 0) {
        console.log(err);
    }
    else {
        console.log("验证通过");
    }
});
