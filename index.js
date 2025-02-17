let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
 
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
 
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
 
const items = ["Тревис Скот", "Леша Ломов", "Леша Гей"];

const searchInput = document.getElementById("sbx");



searchInput.addEventListener('Input',() => {
  const query = searchInput.value.toLowerCase();
  results.innerHTML = '';
  items.forEach(item =>{
    if(item.toLowerCase().includes(query)) {
      const li = document.createElement('li');
      li.textContent = item;
      results.appendChild(li);
    }
  });
});

let track_index = 0;
let a_index = 0;
let isPlaying = false;
let updateTimer;




const search_button = document.querySelector(".Search");
const search_val = document.querySelector(".Search_input");

search_button.addEventListener("click",(event) => {
  event.preventDefault();
  document.getElementById("Search_block").style.display = "block";
});


window.onclick = function(e) {
  if (!e.target.closest('.Search')) {
    document.getElementById("Search_block").style.display = "none";
  }
};
 

let curr_track = document.createElement('audio');
 

let track_list = [
  {
    name: "Life is good",
    artist: "Future",
    image: "Image URL",
    path: "music/Life Is Good (feat. Drake)   Future.mp3"
    
  },
  {
    name: "Rockstar made",
    artist: "Cartie",
    image: "i",
    path: "music/Rockstar Made   Playboi Carti.mp3"
  },
  {
    name: "Give it to me",
    artist: "Timberland",
    image: "Image URL",
    path: "music/Give_It_To_Me_feat_Justin_Timberlake_Nelly_Furtado_Timbal.mp3",
  },
  {
    name: "bohemian rhapsody",
    artist: "Queen",
    image: "Image URL",
    path: "music/Bohemian Rhapsody   Queen.mp3",
  }
]



function loadTrack(track_index) {
    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();
    
    // Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();
    
    // Update details of the track
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);
    
    // Move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.addEventListener("ended", nextTrack);
}
    


    
    // Function to reset all values to their default
    function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    isPlaying = false;      
    // Replace icon with the play icon
    playpause_btn.innerHTML = '<i class="fa fa-play-circle" aria-hidden="true"></i>'
    
    }

    function playpauseTrack() {
        // Switch between playing and pausing
        // depending on the current state
        if (!isPlaying) playTrack();
        else pauseTrack();
      }
       
      function playTrack() {
        // Play the loaded track
        curr_track.play();
        isPlaying = true;
        
        playpause_btn.innerHTML = '<i class="fa fa-pause-circle-o" aria-hidden="true"></i>';
      }
       
      function pauseTrack() {
        // Pause the loaded track
        curr_track.pause();
        isPlaying = false;
       
        // Replace icon with the play icon
        playpause_btn.innerHTML = '<i class="fa fa-play-circle" aria-hidden="true"></i>';
      }
       
      function nextTrack() {
        // Go back to the first track if the
        // current one is the last in the track list
        if (track_index < track_list.length - 1)
          track_index += 1;
        else track_index = 0;
       
        // Load and play the new track
        loadTrack(track_index);
        playTrack();
      }
       
      function prevTrack() {
        if(curr_track.currentTime >= 5){
          loadTrack(track_index);
          playTrack();  
        }else if(curr_track.currentTime < 5){
          if (track_index > 0)
            track_index -= 1;
          else track_index = track_list.length - 1;
          loadTrack(track_index);
          playTrack();  
          }
      }   
 

      function seekTo() {
        // Calculate the seek position by the
        // percentage of the seek slider 
        // and get the relative duration to the track
        seekto = curr_track.duration * (seek_slider.value / 100);
       
        // Set the current track position to the calculated seek position
        curr_track.currentTime = seekto;
      }
       
      function setVolume() {
        // Set the volume according to the
        // percentage of the volume slider set
        curr_track.volume = volume_slider.value / 100;
      }
       
      function seekUpdate() {
        let seekPosition = 0;
       
        // Check if the current track duration is a legible number
        if (!isNaN(curr_track.duration)) {
          seekPosition = curr_track.currentTime * (100 / curr_track.duration);
          seek_slider.value = seekPosition;
       
          // Calculate the time left and the total duration
          let currentMinutes = Math.floor(curr_track.currentTime / 60);
          let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
          let durationMinutes = Math.floor(curr_track.duration / 60);
          let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
       
          // Add a zero to the single digit time values
          if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
          if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
          if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
          if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
       
          // Display the updated duration
          curr_time.textContent = currentMinutes + ":" + currentSeconds;
          total_duration.textContent = durationMinutes + ":" + durationSeconds;
        }

      }


      
      function focusIsInside(element) {
        return element.contains(document.activeElement)
      }
      
      function collapseDropdownsWhenTabbingOutsideNav(e) {
        if (e.keyCode === 9 && !focusIsInside(nav)) {
          dropdowns.forEach(function (dropdown) {
            dropdown.setAttribute('hidden', '')
            const btn = dropdown.parentNode.querySelector('button')
            btn.setAttribute('aria-expanded', 'false')
          })
        }
      }
      
      function collapseDropdownsWhenClickingOutsideNav(e) {
        const target = e.target
      
        dropdowns.forEach(function (dropdown) {
          if (!dropdown.parentNode.contains(target)) {
            dropdown.setAttribute('hidden', '')
            const btn = dropdown.parentNode.querySelector('button')
            btn.setAttribute('aria-expanded', 'false')
          }
        });
      }
      
      // Закрываем навигацию, если протапались за её пределы
      document.addEventListener('keyup', collapseDropdownsWhenTabbingOutsideNav)
      
      // Закрываем навигацию, если кликнули вне навигации
      window.addEventListener('click', collapseDropdownsWhenClickingOutsideNav)
      


      function addTrackToMenu(track,a_index) {
        const trackElement = document.createElement('a');
        trackElement.href = "#";
        trackElement.textContent = `${track.name}`; 

        trackElement.addEventListener('click', (event) => {
          event.preventDefault();
          loadTrack(a_index);
          track_index = a_index;
          
        });
        
        mymusicset.appendChild(trackElement);
    
      }

      track_list.forEach(track => {
        addTrackToMenu(track,a_index); // Добавляем каждый трек в меню
        a_index +=1;
      });    
 


      //loadTrack(track_index);
    
