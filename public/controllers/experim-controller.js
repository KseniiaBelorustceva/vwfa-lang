/* jsPsych-based behavioral experiment */
/* created: Mar 2015 */
/* author: kseniia.belorustceva@aalto.fi */

myApp.controller('ExpCtrl', ['$scope','$http','$location', 'myService', 

  function($scope, $http, $location, myService){

//  $scope.participantID = myService.sharedObject.sharedParticipantID;


 //     console.log("in experim-controller  myService: " +  myService);
 //     console.log("in experim-controller  myService.sharedObject: " +  myService.sharedObject);
//      console.log("in experim-controller  myService.sharedObject.sharedParticipantID: " +  myService.sharedObject.sharedParticipantID);
  $scope.doExperiment = function (){
//var doExperiment = function(){
        var NUM_TEST = 1;
        var NUM_TRAIN = 3; //number of trials=words in training block
        var NUM_REAL = 30; // number of trials=words in real block
        
        /* ************ The whole 'test' experiment ************* */
        
        /* Trials */
        var train_test_trials = [];
        for( var i = 1; i <= NUM_TEST; i++){
          var one_trial = [];
          one_trial.push('img/eng/' + i +'_1.png'); 
          one_trial.push('img/eng/' + i +'_2.png'); 
              train_test_trials.push(one_trial);
         } 
         
        /* Trial blocks */
        var train_test_trial_block = [];
        for(var i = 0; i < NUM_TEST; i++) {
          var trial = {
            type: 'xab',
            stimuli: [train_test_trials[i]],
            prompt: "<p><br><br></p><p class='center-content'>Which word you just saw?<br>Press left arrow (&larr;) or right arrow (&rarr;)</p>",
            left_key: 37,
            right_key: 39,
            timing_ab: 5000
          }
          train_test_trial_block.push(trial);
        };

        /* Relax block with animation, 7x4s */
        var animation_sequence = [];
        for (var i = 1; i < 7; i++){
          animation_sequence.push("img/relax/"+i+".jpg");
        };

        var relax_block = {
          type: 'animation',
          stimuli: [animation_sequence],
          sequence_reps: 1,
          frame_time: 4000
        };
        
        
        /* ****************************************************** */
        /* ************ The whole 'real' experiment ************* */
        /* ****************************************************** */
        /* Paths to resources */
        
        /* Trials */
        // TODO
        var train_Fin_trials = [];
        var real_Fin_trials = [];
        var train_Rus_trials = [];
        var real_Fin_trials = [];

        /* Trial blocks */
        // TODO 
        var train_Fin_trial_block = [];
        var real_Fin_trial_block = [];
        var train_Rus_trial_block = [];
        var real_Rus_trial_block = [];
          
        /* Text blocks */
        var train_start_text_block = { 
          type: 'text',
          text: "<p class='center-content'>Short training trials start now.<br>Press any key to begin.</p>"
        }
        var train_over_text_block = { 
          type: 'text',
          text: 'Short training trials are over'
        }
        var real_start_text_block = { 
          type: 'text',
          text: 'Real trials start now'
        }
        var real_over_text_block = { 
          type: 'text',
          text: 'Real trials are over'
        }
        var instructions_block = { 
          type: 'text',
          text: 'instructions will be here'
        }
        
        /* Chunks */
        // define welcome-info chunk sequence
        var chunk_welcome = [];
        chunk_welcome.push(instructions_block);
        
        // define Fin training chunk sequence
        var chunk_Fin_train = {
          chunk_type: 'linear',
          timeline: [train_start_text_block, train_Fin_trial_block, train_over_text_block]
        }
        // ----- define Fin training chunk sequence -----
        
        // define Fin real chunk sequence
        var chunk_Fin_real = {
          chunk_type: 'linear',
          timeline: [real_start_text_block, real_Fin_trial_block, real_over_text_block]
        }
        // ----- define Fin real chunk sequence -----
        
        // define Rus training chunk sequence
        var chunk_Rus_train = {
          chunk_type: 'linear',
          timeline: [train_start_text_block, train_Rus_trial_block, train_over_text_block]
        }
        // ----- define Rus training chunk sequence -----
        
        // define Rus real chunk sequence
        var chunk_Rus_real = {
          chunk_type: 'linear',
          timeline: [real_start_text_block, real_Rus_trial_block, real_over_text_block]
        }
        // ----- define Rus real chunk sequence -----
        
        /* Chunks */
        var chunk_timeline = [];
        chunk_timeline.push(train_start_text_block);
        for(var i = 0; i < NUM_TEST; i++) {
          chunk_timeline.push(train_test_trial_block[i]);
        }
        chunk_timeline.push(train_over_text_block);
      
      //  chunk_timeline.push(relax_block);
        
        var chunk_test_train = {
          chunk_type: 'linear',
          timeline: chunk_timeline
        }
        
        var exp_timeline = [];
        exp_timeline.push(chunk_test_train);
        //exp_timeline.push(chunk_welcome);   // blocks: 1 instructions
        //exp_timeline.push(chunk_Fin_train); // blocks: 1 train_start_text_block + NUM_TRAIN trials + 1 train_over_text_block
        //exp_timeline.push(chunk_Fin_real);  // blocks: 1 real_start_text_block + NUM_REAL trials + 1 real_over_text_block + 1 relax_block
        //exp_timeline.push(chunk_Rus_train); // blocks
        //exp_timeline.push(chunk_Rus_real);  // blocks

        /* start the experiment */
        jsPsych.init({
            display_element: $('#jspsych-target'),
            experiment_structure: exp_timeline,
            on_finish: function() {
                var data = jsPsych.data.getData();
                for(i = 0; i < data.length; i++) {
                    data[i].particip_id = myService.sharedObject.sharedParticipantID;
                   // $scope.participantID;
                }

                $.ajax({
                  type: "POST",
                  url: "/experiment",
                  data:  JSON.stringify(data),
                  contentType: "application/json"
                })
                  .done(function() {
                     window.location.href = "/contact.html";
                  })
                  .fail(function() {
                     alert("A problem occurred while writing to the database. Please contact the researcher for more information.")
                     window.location.href = "/contact.html";
                  })
            }
        });
};

/*  end of myApp.controller('ExpCtrl', ['$scope','$http','$location', function { */

  }]);


  