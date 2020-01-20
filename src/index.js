import { Observable, of, interval } from 'rxjs';
import { map, first } from 'rxjs/operators';

map(x => x * x)(of(1,2,3)).subscribe(console.log);

// first()(of(1,2,3)).subscribe(console.log)

// const observable = interval(2000);
// observable.subscribe(console.log)

function delay(delayInMillis) {
    return observable => new Observable(observer => {
        const allTimerIDs = new Set();
        const subscription = observable.subscribe({
            next(value) {
                const timerID = setTimeout(() => {
                    observer.next(value);
                    allTimerIDs.delete(timerID);
                }, delayInMillis);
                allTimerIDs.add(timerID);
            },
            error(err) {
                observer.error(err);
            },
            complete() {
                observer.complete();
            }
        })

        return () => {
            subscription.unsubscribe();
            allTimerIDs.forEach(timerID => {
                clearTimeout(timerID);
            })
        }
    })
}
const obs = of(1,2,3);
// obs.subscribe({
//     next(v) { console.log(v) },
//     error(err) {console.error(err)},
//     complete() { console.log('complete!')}
// });
delay(3000)(obs).subscribe({
    next(v) { console.log(v) },
    error(err) {console.error(err)},
    complete() { console.log('complete!')}
});