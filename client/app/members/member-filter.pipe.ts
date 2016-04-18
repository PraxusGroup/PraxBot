import { PipeTransform, Pipe } from 'angular2/core';

@Pipe({
  name: 'memberFilter'
})

export class MemberFilterPipe implements PipeTransform {
  transform(value, args: string[]) {
    let filter: string = args[0] ? args[0].toLocaleLowerCase() : null;
    return filter ? value.filter((member) =>
      member.userName.toLocaleLowerCase().indexOf(filter) != -1) : value;
  }
}
