const container=document.querySelector('.container');
const seats=document.querySelectorAll('.row .seat');
const count=document.getElementById('count');
const total=document.getElementById('total');
const selectMovie=document.getElementById('movie');

let ticketPrice=+selectMovie.value;

updateUI();

function updateCount(){
    const selectedSeats=document.querySelectorAll('.row .seat.selected');
    const seatIndex = [...selectedSeats].map( seat => [...seats].indexOf(seat) );
    // const seatIndex=[...selectedSeats].map(seats => [...seats].indexOf(seat));
    const selectedSeatsCount = selectedSeats.length;
    count.innerText=selectedSeatsCount;
    total.innerText=selectedSeatsCount*ticketPrice;
    localStorage.setItem('selectedSeats',JSON.stringify(seatIndex));

};
function saveMovieData(movieIndex,moviePrice){
    localStorage.setItem('movieIndex',movieIndex);
    localStorage.setItem('moviePrice',moviePrice);
};
function updateUI(){
    const selectedSeats =JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats!==null && selectedSeats.length>0 ){
        seats.forEach((seat,index) => {
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected');
                ticketPrice= JSON.parse(localStorage.getItem('moviePrice'));

            }
        })
    }
    updateCount();
};
//Event listers
container.addEventListener('click', e=> {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied'))
    {
        e.target.classList.toggle('selected');
        updateCount();
    }

});
selectMovie.addEventListener('change', e =>{
    ticketPrice= +e.target.value;
    updateCount();
    // ticketPrice= JSON.parse(localStorage.getItem('moviePrice'));
    saveMovieData(e.target.seatIndex,e.target.value);
});