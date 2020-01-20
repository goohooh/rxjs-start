import { Observable } from 'rxjs';
import print from './print';

// print();

const observable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

// console.log('just before subscribe');
// observable.subscribe({
//   next(x) { console.log('got value ' + x); },
//   error(err) { console.error('something wrong occurred: ' + err); },
//   complete() { console.log('done'); }
// });
// console.log('just after subscribe');

const foo = new Observable(subscriber => {
  console.log('!Hello!');
  subscriber.next(64);
  subscriber.next(128);
  subscriber.next(256);
  setTimeout(() => subscriber.next(512));
});

console.log('foo start')
foo.subscribe(console.log);
console.log('foo end')