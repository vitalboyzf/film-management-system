import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";

export abstract class BaseEntities {
  /**
   * 验证函数
   */
  public async validateThis(skipMiss: boolean = false): Promise<string[]> {
    const error = await validate(this, {
      skipMissingProperties: skipMiss
    });
    const temp = error.map(e => Object.values(e.constraints!));
    const result: string[] = [];
    temp.forEach(item => {
      result.push(...item);
    });
    return result;
  }
  /**
   * 类型转化方法
   * @param plainObject 平面对象
   */
  protected static baseTransform<T>(cls: ClassType<T>, plainObject: object): T {
    if (plainObject instanceof cls) {
      return plainObject;
    }
    return plainToClass(cls, plainObject);
  }
}