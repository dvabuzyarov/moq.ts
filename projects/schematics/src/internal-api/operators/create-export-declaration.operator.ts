import { InjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { Injectable } from "@angular/core";
import { createExportDeclaration, createStringLiteral } from "typescript";

@Injectable()
export class CreateExportDeclarationOperator implements InjectionFactory {
  constructor() {
    return this.factory() as any;
  }

  factory() {
      return (paths: string[]) => paths
          .map(path => createExportDeclaration(undefined, undefined, undefined, createStringLiteral(path), false));
  }
}
