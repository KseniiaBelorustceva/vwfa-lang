myApp = angular.module('myApp', [])

myApp.controller('AppCtrl', ['$scope', '$http','$location', 

	function($scope, $http, $location){

		$scope.refresh = function (){
			$http.get('/participate').success(function(response){
				$scope.participantlist = response;
				$scope.participant = "";
			});
		};

		$scope.addParticipant = function(){
			$http.post('/participate', $scope.participant)
				.success(function(response){ // success-promise	
					console.log("success-response from addParticipant():" + response)
				});	
			$scope.refresh();
		};
  		
  		$scope.doExperiment = function (){

	        var NUM_TEST = 1;
	        var NUM_TRAIN = 3; //number of trials=words in training block
	        var NUM_REAL = 30; // number of trials=words in real block
	        var NUM_LONG_RELAX = 4; // 4 imgs x 4 sec = 16 sec
	        var NUM_SHORT_RELAX = 2; // 2 imgs x 4 sec = 6 sec
	        
	        /* ************ The whole 'test' experiment ************* */
	        
	        var train_textpromt = "<p><br><br></p><p class='center-content'>Which word you just saw?<br>Press &larr; (left arrow) or (right arrow) &rarr;</p>";
	        var real_textpromt = "<p><br><br></p><p class='center-content'>&larr; (left arrow) or (right arrow) &rarr;</p>";

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
	            prompt: train_textpromt,
	            left_key: 37,
	            right_key: 39,
	            timing_ab: 5000
	          }
	          train_test_trial_block.push(trial);
	        };

	        /* Relax block with animation, 7x4s */
	        var animation_sequence = [];
	        for (var i = 1; i < NUM_LONG_RELAX; i++){
	          animation_sequence.push("img/relax/"+i+".jpg");
	        };

	        var relax_block = {
	          type: 'animation',
	          stimuli: [animation_sequence],
	          sequence_reps: 1,
	          frame_time: 4000
	        };

	         var animation_sequence = [];
	        for (var i = 1; i < NUM_SHORT_RELAX; i++){
	          animation_sequence.push("img/relax/s"+i+".jpg");
	        };

	        var test_relax_block = {
	          type: 'animation',
	          stimuli: [animation_sequence],
	          sequence_reps: 1,
	          frame_time: 4000
	        };
	        
	        
	        /* ****************************************************** */
	        /* ************ The whole 'real' experiment ************* */
	        /* ****************************************************** */
	        
	        /********************* Trial sequences ********************/
	        var train_Fin_trials = [];
			for( var i = 1; i <= NUM_TRAIN; i++){
				var one_trial = [];
				one_trial.push('img/fin/train/' + i +'_1.png'); 
				one_trial.push('img/fin/train/' + i +'_2.png'); 
				train_Fin_trials.push(one_trial);
	        } 

	        var real_Fin_trials = [];
	        for( var i = 1; i <= NUM_REAL; i++){
				var one_trial = [];
				one_trial.push('img/fin/' + i +'_1.png'); 
				one_trial.push('img/fin/' + i +'_2.png'); 
				real_Fin_trials.push(one_trial);
	        } 

	        var train_Rus_trials = [];
	        for( var i = 1; i <= NUM_TRAIN; i++){
				var one_trial = [];
				one_trial.push('img/rus/train/' + i +'_1.png'); 
				one_trial.push('img/rus/train/' + i +'_2.png'); 
				train_Rus_trials.push(one_trial);
	        } 
	        var real_Rus_trials = [];
	         for( var i = 1; i <= NUM_REAL; i++){
				var one_trial = [];
				one_trial.push('img/rus/' + i +'_1.png'); 
				one_trial.push('img/rus/' + i +'_2.png'); 
				real_Rus_trials.push(one_trial);
	        } 

	        /************************ Trial blocks **********************/
	        // TODO 
	        var train_Fin_trial_block = [];
	        for(var i = 0; i < NUM_TRAIN; i++) {
	          var trial = {
	            type: 'xab',
	            stimuli: [train_Fin_trials[i]],
	            prompt: train_textpromt,
	            left_key: 37,
	            right_key: 39,
	            timing_ab: 5000
	          }
	          train_Fin_trial_block.push(trial);
	        };

	        var real_Fin_trial_block = [];
	        for(var i = 0; i < NUM_REAL; i++) {
	          var trial = {
	            type: 'xab',
	            stimuli: [real_Fin_trials[i]],
	            prompt: real_textpromt,
	            left_key: 37,
	            right_key: 39,
	            timing_ab: 5000
	          }
	          real_Fin_trial_block.push(trial);
	        };

	        var train_Rus_trial_block = [];
			for(var i = 0; i < NUM_TRAIN; i++) {
	          var trial = {
	            type: 'xab',
	            stimuli: [train_Rus_trials[i]],
	            prompt: train_textpromt,
	            left_key: 37,
	            right_key: 39,
	            timing_ab: 5000
	          }
	          train_Rus_trial_block.push(trial);
	        };

	        var real_Rus_trial_block = [];
	        for(var i = 0; i < NUM_REAL; i++) {
	          var trial = {
	            type: 'xab',
	            stimuli: [real_Rus_trials[i]],
	            prompt: real_textpromt,
	            left_key: 37,
	            right_key: 39,
	            timing_ab: 5000
	          }
	          real_Rus_trial_block.push(trial);
	        };
	          
	        /******************************** Text blocks **********************/
	        var train_start_text_block = { 
	          type: 'text',
	          text: "<p class='center-content'>Short training trials start now.<br>Press any key to begin.</p>"
	        }
	        var train_over_text_block = { 
	          type: 'text',
	          text: "<p class='center-content'>Short training trials are over.<br>Press any key to continue with real trials.</p>"
	        }
	        var real_start_text_block = { 
	          type: 'text',
	          text: "<p class='center-content'>Real trials start now. Ready?<br>Press any key to continue."
	        }
	        var real_over_text_block = { 
	          type: 'text',
	          text: "<p class='center-content'>Real trials are over. Thank you!<br>Press any key to continue.</p>"
	        }
	        var instructions_block = { 
	          type: 'text',
	          text: "<p class='center-content'>instructions will be here<br>Press any key to continue.</p>"
	        }
	        
	        /**************************** Chunks ***************************/
	        // define Fin training chunk sequence
	        var chunk_timeline = [];
	        chunk_timeline.push(train_start_text_block);
	        for(var i = 0; i < NUM_TRAIN; i++) {
	          chunk_timeline.push(train_Fin_trial_block[i]);
	        }
	        chunk_timeline.push(train_over_text_block); 
	      	chunk_timeline.push(test_relax_block);
	        var chunk_Fin_train = {
	          chunk_type: 'linear',
	          timeline: chunk_timeline
	        }
	        /* end of chunk timeline for test chunk */
	        /*var chunk_Fin_train = {
	          chunk_type: 'linear',
	          timeline: [train_start_text_block, train_Fin_trial_block, train_over_text_block]
	        }*/
	        // ----- define Fin training chunk sequence -----
	        
	        // define Fin real chunk sequence
	        var chunk_timeline = [];
	        chunk_timeline.push(real_start_text_block);
	        for(var i = 0; i < NUM_REAL; i++) {
	          chunk_timeline.push(real_Fin_trial_block[i]);
	        }
	        chunk_timeline.push(real_over_text_block); 
	      	chunk_timeline.push(relax_block);
	        var chunk_Fin_real = {
	          chunk_type: 'linear',
	          timeline: chunk_timeline
	        }

	       /* var chunk_Fin_real = {
	          chunk_type: 'linear',
	          timeline: [real_start_text_block, real_Fin_trial_block, real_over_text_block]
	        }*/
	        // ----- define Fin real chunk sequence -----
	        
	        // define Rus training chunk sequence
	        var chunk_timeline = [];
	        chunk_timeline.push(train_start_text_block);
	        for(var i = 0; i < NUM_TRAIN; i++) {
	          chunk_timeline.push(train_Rus_trial_block[i]);
	        }
	        chunk_timeline.push(train_over_text_block); 
	      	chunk_timeline.push(relax_block);
	        var chunk_Rus_train = {
	          chunk_type: 'linear',
	          timeline: chunk_timeline
	        }
	        /*var chunk_Rus_train = {
	          chunk_type: 'linear',
	          timeline: [train_start_text_block, train_Rus_trial_block, train_over_text_block]
	        }*/
	        // ----- define Rus training chunk sequence -----
	        
	        // define Rus real chunk sequence
	        var chunk_timeline = [];
	        chunk_timeline.push(real_start_text_block);
	        for(var i = 0; i < NUM_TRAIN; i++) {
	          chunk_timeline.push(real_Rus_trial_block[i]);
	        }
	        chunk_timeline.push(real_over_text_block); 
	      	chunk_timeline.push(relax_block);
	        var chunk_Rus_real = {
	          chunk_type: 'linear',
	          timeline: chunk_timeline
	        }
	        /*var chunk_Rus_real = {
	          chunk_type: 'linear',
	          timeline: [real_start_text_block, real_Rus_trial_block, real_over_text_block]
	        }*/
	        // ----- define Rus real chunk sequence -----
	        
	        /* chunk timeline for test chunk */
	        var chunk_timeline = [];
	        chunk_timeline.push(train_start_text_block);
	        for(var i = 0; i < NUM_TEST; i++) {
	          chunk_timeline.push(train_test_trial_block[i]);
	        }
	        chunk_timeline.push(train_over_text_block); 
	      	//chunk_timeline.push(relax_block);
	        var chunk_test_train = {
	          chunk_type: 'linear',
	          timeline: chunk_timeline
	        }
	        /* end of chunk timeline for test chunk */


	        // define welcome-info chunk sequence
	       // var chunk_welcome = [];
	        //chunk_welcome.push(instructions_block);

	        var chunk_timeline = [];
	        chunk_timeline.push(instructions_block);
	        var chunk_welcome = {
	          chunk_type: 'linear',
	          timeline: chunk_timeline
	        }
	        
	        var exp_timeline = [];
	       // exp_timeline.push(chunk_test_train);
	        exp_timeline.push(chunk_welcome);   // blocks: 1 instructions
	        exp_timeline.push(chunk_Fin_train); // blocks: 1 train_start_text_block + NUM_TRAIN trials + 1 train_over_text_block
	        //exp_timeline.push(chunk_Fin_real);  // blocks: 1 real_start_text_block + NUM_REAL trials + 1 real_over_text_block + 1 relax_block
	        exp_timeline.push(chunk_Rus_train); // blocks
	        //exp_timeline.push(chunk_Rus_real);  // blocks

	        /***************************** start the experiment ************************/
	        jsPsych.init({
	            display_element: $('#jspsych-target'),
	            experiment_structure: exp_timeline,
	            on_finish: function() {
	                var data = jsPsych.data.getData();
	                /*for(i = 0; i < data.length; i++) {
	                	console.log("In on_finish finction: setting $scope.particID to jpsych data: " + $scope.particID);
	                    data[i].particip_id = $scope.particID;
	                   // $scope.participantID;
	                }*/

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

/*  This is the end of myApp.controller('ExpCtrl', ['$scope','$http','$location', function { */
  }]);


  

