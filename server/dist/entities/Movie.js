var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const class_validator_1 = require("class-validator");
class Movie {
    constructor() {
        this.isHot = true;
        this.isComing = true;
        this.isClassic = true;
    }
}
__decorate([
    class_validator_1.IsNotEmpty({ message: "电影名字不能为空" }),
    __metadata("design:type", String)
], Movie.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "电影类型不能为空" }),
    class_validator_1.ArrayMinSize(1, { message: "电影类型至少有一个" }),
    __metadata("design:type", Array)
], Movie.prototype, "types", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "电影上映地区不能为空" }),
    class_validator_1.ArrayMinSize(1, { message: "电影上映地区至少有一个" }),
    __metadata("design:type", Array)
], Movie.prototype, "areas", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "电影时长不为空" }),
    class_validator_1.IsInt({ message: "时长必须是整数" }),
    class_validator_1.Min(1, { message: "时长过短" }),
    class_validator_1.Max(10000, { message: "时长过长" }),
    __metadata("design:type", Number)
], Movie.prototype, "timeLong", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "电影是否热映不为空" }),
    __metadata("design:type", Boolean)
], Movie.prototype, "isHot", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "电影是否正在进行中不为空" }),
    __metadata("design:type", Boolean)
], Movie.prototype, "isComing", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "电影是否是经典电影不为空" }),
    __metadata("design:type", Boolean)
], Movie.prototype, "isClassic", void 0);
exports.Movie = Movie;
