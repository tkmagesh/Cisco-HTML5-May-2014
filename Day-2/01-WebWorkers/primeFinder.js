function findPrimeCount(start,end){
	var current = start;
	var primeCount = 0;
	for(var current = start;current <= end; current++)
	{
		if (isPrime(current)){
			primeCount++;
			var percentCompleted = ((current-start)/(end-start)) * 100;
			displayStatus(primeCount, percentCompleted);
		}
	}
}
function displayStatus(primeCount,percentCompleted){
	self.postMessage({type : "findPrimeProgress", primeCount : primeCount, percentCompleted : percentCompleted});
}
function isPrime(n){
	if (n<=3) return true;
	for(var i=2;i<=(n/2);i++)
		if (n%i == 0) return false;
	return true;
}
self.addEventListener("message",function(msgEvt){
	var data = msgEvt.data;
	if (data.type === "findPrimes"){
		findPrimeCount(data.start, data.end);
	}
});