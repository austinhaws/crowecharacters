--
--    Copyright 2010-2016 the original author or authors.
--
--    Licensed under the Apache License, Version 2.0 (the "License");
--    you may not use this file except in compliance with the License.
--    You may obtain a copy of the License at
--
--       http://www.apache.org/licenses/LICENSE-2.0
--
--    Unless required by applicable law or agreed to in writing, software
--    distributed under the License is distributed on an "AS IS" BASIS,
--    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
--    See the License for the specific language governing permissions and
--    limitations under the License.
--

-- // base
-- Migration SQL that makes the change goes here.

CREATE TABLE account (
	id INT NOT NULL AUTO_INCREMENT,
	guid VARCHAR(50) NOT NULL,
	phrase VARCHAR(50) NOT NULL,
	CONSTRAINT account_pk PRIMARY KEY (id),
	CONSTRAINT account_guid_u UNIQUE(guid)
)
;

CREATE TABLE role (
	id INT NOT NULL AUTO_INCREMENT,
	role VARCHAR(500),
	PRIMARY KEY (id)
)
;
CREATE TABLE account_x_role (
	id INT NOT NULL AUTO_INCREMENT,
	account_id INT NOT NULL,
	role_id INT NOT NULL,
	CONSTRAINT accountrole_pk PRIMARY KEY (id),
	CONSTRAINT accountrole_account_fk FOREIGN KEY (account_id) REFERENCES account(id),
	CONSTRAINT accountrole_role_fk FOREIGN KEY (role_id) REFERENCES role(id)
)
;

INSERT INTO role (role) VALUES ('admin')
;


CREATE TABLE image_set (
	id INT NOT NULL AUTO_INCREMENT,
	guid VARCHAR(50) NOT NULL,
	name VARCHAR(500) NOT NULL,
	CONSTRAINT imageset_pk PRIMARY KEY (id),
	CONSTRAINT imageset_guid_u UNIQUE(guid)
)
;

CREATE TABLE image_category (
	id INT NOT NULL AUTO_INCREMENT,
	guid VARCHAR(50) NOT NULL,
	name VARCHAR(500) NOT NULL,
	CONSTRAINT imagecat_pk PRIMARY KEY (id),
	CONSTRAINT imagecat_guid_u UNIQUE(guid)
)
;

CREATE TABLE image (
	id INT NOT NULL AUTO_INCREMENT,
	guid VARCHAR(50) not null,
	CONSTRAINT image_pk PRIMARY KEY (id),
	CONSTRAINT image_guid_u UNIQUE(guid)
)
;

CREATE TABLE image_x_image_category (
	id INT NOT NULL AUTO_INCREMENT,
	image_category_id INT NOT NULL,
	image_id INT NOT NULL,
	CONSTRAINT imgimgcat_pk PRIMARY KEY (id),
	CONSTRAINT imgimgcat_cat_fk FOREIGN KEY (image_category_id) REFERENCES image_category(id),
	CONSTRAINT imgimgcat_img_fk FOREIGN KEY (image_id) REFERENCES image(id)
)
;

CREATE TABLE image_set_x_image (
	id INT NOT NULL AUTO_INCREMENT,
	image_set_id INT NOT NULL,
	image_id INT NOT NULL,
	CONSTRAINT imgsetimg_pk PRIMARY KEY (id),
	CONSTRAINT imgsetimg_imgset_fk FOREIGN KEY (image_set_id) REFERENCES image_set(id),
	CONSTRAINT imgsetimg_img_fk FOREIGN KEY (image_id) REFERENCES image(id)
)
;

CREATE TABLE doll (
	id INT NOT NULL AUTO_INCREMENT,
	guid VARCHAR(50) NOT NULL,
	CONSTRAINT doll_pk PRIMARY KEY (id),
	CONSTRAINT doll_guid_u UNIQUE(guid)
)
;

CREATE TABLE account_x_doll (
	id INT NOT NULL AUTO_INCREMENT,
	account_id INT NOT NULL,
	doll_id INT NOT NULL,
	CONSTRAINT accountdoll_pk PRIMARY KEY (id),
	CONSTRAINT accountdoll_doll_fk FOREIGN KEY (doll_id) REFERENCES doll(id),
	CONSTRAINT accountdoll_account_fk FOREIGN KEY (account_id) REFERENCES account(id)
)
;

CREATE TABLE doll_x_image (
	id INT NOT NULL AUTO_INCREMENT,
	image_id INT NOT NULL,
	doll_id INT NOT NULL,
	CONSTRAINT dollimg_pk PRIMARY KEY (id),
	CONSTRAINT dollimg_doll_fk FOREIGN KEY (doll_id) REFERENCES doll(id),
	CONSTRAINT dollimg_image_fk FOREIGN KEY (image_id) REFERENCES image(id)
)
;

CREATE TABLE word_type (
	id INT NOT NULL AUTO_INCREMENT,
	type VARCHAR(500) NOT NULL,
	CONSTRAINT wordtype_pk PRIMARY KEY (id)
);

INSERT INTO word_type (type) VALUES
	('adjective'),
	('noun')
;

CREATE TABLE word (
	id INT NOT NULL AUTO_INCREMENT,
	word_type_id INT NOT NULL,
	word VARCHAR(500) NOT NULL,
	CONSTRAINT word_pk PRIMARY KEY (id),
	CONSTRAINT word_type_fk FOREIGN KEY (word_type_id) REFERENCES word_type(id)
);

CREATE TABLE temp (
	temp VARCHAR(500)
)
;

INSERT INTO temp (temp) VALUES
	('Abundant'), ('Acidic'), ('Aggressive'), ('Agreeable'), ('Alive'), ('Ambitious'), ('Ancient'), ('Angry'),
	('Ashy'), ('Attractive'), ('Bald'), ('Beautiful'), ('Better'), ('Bewildered'), ('Big'), ('Billions'), ('Bitter'),
	('Black'), ('Blue'), ('Brave'), ('Breezy'), ('Brief'), ('Broad'), ('Bumpy'), ('Calm'), ('Careful'), ('Chilly'), ('Chubby'),
	('Chubby'), ('Clean'), ('Clever'), ('Clumsy'), ('Cold'), ('Colossal'), ('Cool'), ('Cool'), ('Crashing'), ('Creamy'),
	('Crooked'), ('Cuddly'), ('Curved'), ('Damaged'), ('Damp'), ('Dazzling'), ('Dead'), ('Deafening'), ('Deep'),
	('Defeated'), ('Delicious'), ('Delightful'), ('Dirty'), ('Disgusting'), ('Drab'), ('Dry'), ('Eager'), ('Early'),
	('Easy'), ('Echoing'), ('Elegant'), ('Embarrassed'), ('Enough'), ('Faint'), ('Faithful'), ('Famous'), ('Fancy'),
	('Fast'), ('Fat'), ('Few'), ('Fierce'), ('Fit'), ('Flabby'), ('Flaky'), ('Flat'), ('Fluffy'), ('Freezing'), ('Fresh'),
	('Full'), ('Future'), ('Gentle'), ('Gifted'), ('Gigantic'), ('Glamorous'), ('Gorgeous'), ('Gray'), ('Greasy'),
	('Greasy'), ('Great'), ('Green'), ('Grumpy'), ('Hallowed'), ('Handsome'), ('Happy'), ('Harsh'), ('Helpful'),
	('Helpless'), ('High'), ('Hissing'), ('Hollow'), ('Hot'), ('Hot'), ('Howling'), ('Huge'), ('Hundreds'), ('Icy'),
	('Immense'), ('Important'), ('Incalculable'), ('Inexpensive'), ('Itchy'), ('Jealous'), ('Jolly'), ('Juicy'),
	('Kind'), ('Large'), ('Late'), ('Lazy'), ('Lemon'), ('Limited'), ('Little'), ('Lively'), ('Long'),
	('Loose'), ('Loud'), ('Low'), ('Magnificent'), ('Mammoth'), ('Mango'), ('Many'), ('Massive'), ('Mealy'),
	('Melodic'), ('Melted'), ('Microscopic'), ('Millions'), ('Miniature'), ('Modern'), ('Moldy'), ('Most'), ('Muscular'),
	('Mushy'), ('Mysterious'), ('Narrow'), ('Nervous'), ('Nice'), ('Noisy'), ('Numerous'), ('Nutritious'), ('Nutty'),
	('Obedient'), ('Obnoxious'), ('Odd'), ('Old'), ('Orange'), ('Panicky'), ('Petite'), ('Pitiful'), ('Plain'), ('Plump'),
	('Polite'), ('Poor'), ('Powerful'), ('Prehistoric'), ('Prickly'), ('Proud'), ('Puny'), ('Purple'), ('Purring'),
	('Putrid'), ('Quaint'), ('Quick'), ('Quiet'), ('Rancid'), ('Rapid'), ('Rapping'), ('Raspy'), ('Red'), ('Refined'),
	('Repulsive'), ('Rhythmic'), ('Rich'), ('Ripe'), ('Rotten'), ('Rough'), ('Round'), ('Salmon'), ('Salty'), ('Savory'),
	('Scarce'), ('Scary'), ('Scrawny'), ('Screeching'), ('Scruffy'), ('Shaggy'), ('Shallow'), ('Shapely'), ('Sharp'),
	('Short'), ('Shrilling'), ('Shy'), ('Silly'), ('Skinny'), ('Slimy'), ('Slow'),
	('Small'), ('Some'), ('Sour'), ('Sparse'), ('Spicy'), ('Spoiled'), ('Square'), ('Squeaking'), ('Stale'), ('Steep'),
	('Sticky'), ('Stocky'), ('Straight'), ('Strong'), ('Substantial'), ('Sweet'), ('Swift'), ('Tall'), ('Tangy'),
	('Tart'), ('Tasteless'), ('Tasty'), ('Teeny'), ('Tender'), ('Thankful'), ('Thoughtless'), ('Thousands'),
	('Thundering'), ('Tight'), ('Tinkling'), ('Tiny'), ('Ugly'), ('Uneven'), ('Unimportant'), ('Uninterested'),
	('Unkempt'), ('Unsightly'), ('Uptight'), ('Vast'), ('Victorious'), ('Wailing'), ('Warm'), ('Weak'), ('Wet'),
	('Whining'), ('Whispering'), ('White'), ('Wide'), ('Witty'), ('Wonderful'), ('Wooden'), ('Worried'),
	('Wrong'), ('Yellow'), ('Young'), ('Yummy'), ('Zealous')
;

INSERT INTO word (word_type_id, word)
SELECT word_type.id word_type_id, temp word FROM temp LEFT JOIN word_type ON word_type.type = 'adjective'
;

DELETE FROM temp
;

INSERT INTO temp (temp) VALUES 
	('Ability'), ('Abroad'), ('Abuse'), ('Access'), ('Accident'), ('Account'), ('Act'), ('Action'), ('Active'), ('Activity'), ('Actor'),
	('Ad'), ('Addition'), ('Address'), ('Administration'), ('Adult'), ('Advance'), ('Advantage'), ('Advertising'), ('Advice'), ('Affair'),
	('Affect'), ('Afternoon'), ('Age'), ('Agency'), ('Agent'), ('Agreement'), ('Air'), ('Airline'), ('Airport'), ('Alarm'), ('Alcohol'),
	('Alternative'), ('Ambition'), ('Amount'), ('Analysis'), ('Analyst'), ('Anger'), ('Angle'), ('Animal'), ('Annual'), ('Answer'), ('Anxiety'),
	('Anybody'), ('Anything'), ('Anywhere'), ('Apartment'), ('Appeal'), ('Appearance'), ('Apple'), ('Application'), ('Appointment'), ('Area'), ('Argument'),
	('Arm'), ('Army'), ('Arrival'), ('Art'), ('Article'), ('Aside'), ('Ask'), ('Aspect'), ('Assignment'), ('Assist'), ('Assistance'),
	('Assistant'), ('Associate'), ('Association'), ('Assumption'), ('Atmosphere'), ('Attack'), ('Attempt'), ('Attention'), ('Attitude'), ('Audience'), ('Author'),
	('Average'), ('Award'), ('Awareness'), ('Babies'), ('Baby'), ('Back'), ('Background'), ('Bad'), ('Bag'), ('Bake'), ('Balance'),
	('Ball'), ('Banana'), ('Band'), ('Bank'), ('Bar'), ('Base'), ('Baseball'), ('Basis'), ('Basket'), ('Bat'), ('Bath'),
	('Bathroom'), ('Battle'), ('Beach'), ('Bear'), ('Beat'), ('Beautiful'), ('Bed'), ('Bedroom'), ('Beer'), ('Beginning'), ('Being'),
	('Belief'), ('Bell'), ('Belt'), ('Bench'), ('Bend'), ('Benefit'), ('Bet'), ('Beyond'), ('Bicycle'), ('Bid'), ('Big'),
	('Bike'), ('Bill'), ('Bird'), ('Birth'), ('Birthday'), ('Bit'), ('Bite'), ('Bitter'), ('Black'), ('Blame'), ('Blank'),
	('Blind'), ('Block'), ('Blood'), ('Blow'), ('Blue'), ('Board'), ('Boat'), ('Body'), ('Bone'), ('Bonus'), ('Book'),
	('Boot'), ('Border'), ('Boss'), ('Bother'), ('Bottle'), ('Bottom'), ('Bowl'), ('Box'), ('Boy'), ('Boyfriend'), ('Brain'),
	('Branch'), ('Brave'), ('Bread'), ('Break'), ('Breakfast'), ('Breast'), ('Breath'), ('Brick'), ('Bridge'), ('Brief'), ('Brilliant'),
	('Broad'), ('Brother'), ('Brown'), ('Brush'), ('Buddy'), ('Budget'), ('Bug'), ('Building'), ('Bunch'), ('Burn'), ('Bus'),
	('Business'), ('Button'), ('Buy'), ('Buyer'), ('Cabinet'), ('Cable'), ('Cake'), ('Calendar'), ('Call'), ('Calm'), ('Camera'),
	('Camp'), ('Campaign'), ('Can'), ('Cancel'), ('Cancer'), ('Candidate'), ('Candle'), ('Candy'), ('Cap'), ('Capital'), ('Car'),
	('Card'), ('Care'), ('Career'), ('Carpet'), ('Carry'), ('Case'), ('Cash'), ('Cat'), ('Catch'), ('Category'), ('Cats'),
	('Cause'), ('Celebration'), ('Cell'), ('Chain'), ('Chair'), ('Challenge'), ('Champion'), ('Championship'), ('Chance'), ('Change'), ('Channel'),
	('Chapter'), ('Character'), ('Charge'), ('Charity'), ('Chart'), ('Check'), ('Cheek'), ('Chemical'), ('Chemistry'), ('Chest'), ('Chicken'),
	('Child'), ('Childhood'), ('Chip'), ('Chocolate'), ('Choice'), ('Church'), ('Cigarette'), ('City'), ('Claim'), ('Class'), ('Classic'),
	('Classroom'), ('Clerk'), ('Click'), ('Client'), ('Climate'), ('Clock'), ('Closet'), ('Clothes'), ('Cloud'), ('Club'), ('Clue'),
	('Coach'), ('Coast'), ('Coat'), ('Code'), ('Coffee'), ('Cold'), ('Collar'), ('Collection'), ('College'), ('Combination'), ('Combine'),
	('Comfort'), ('Comfortable'), ('Command'), ('Comment'), ('Commercial'), ('Commission'), ('Committee'), ('Common'), ('Communication'), ('Community'), ('Company'),
	('Comparison'), ('Competition'), ('Complaint'), ('Complex'), ('Computer'), ('Concentrate'), ('Concept'), ('Concern'), ('Concert'), ('Conclusion'), ('Condition'),
	('Conference'), ('Confidence'), ('Conflict'), ('Confusion'), ('Connection'), ('Consequence'), ('Consideration'), ('Consist'), ('Constant'), ('Construction'), ('Contact'),
	('Contest'), ('Context'), ('Contract'), ('Contribution'), ('Control'), ('Conversation'), ('Convert'), ('Cook'), ('Cookie'), ('Copy'), ('Corner'),
	('Cost'), ('Count'), ('Counter'), ('Country'), ('County'), ('Couple'), ('Courage'), ('Course'), ('Court'), ('Cousin'), ('Cover'),
	('Cow'), ('Crack'), ('Craft'), ('Crash'), ('Crazy'), ('Cream'), ('Creative'), ('Credit'), ('Crew'), ('Criticism'), ('Cross'),
	('Cry'), ('Culture'), ('Cup'), ('Currency'), ('Current'), ('Curve'), ('Customer'), ('Cut'), ('Cycle'), ('Dad'), ('Damage'),
	('Dance'), ('Dare'), ('Dark'), ('Data'), ('Database'), ('Date'), ('Daughter'), ('David'), ('Day'), ('Dead'), ('Deal'),
	('Dealer'), ('Dear'), ('Death'), ('Debate'), ('Debt'), ('Decision'), ('Deep'), ('Definition'), ('Degree'), ('Delay'), ('Delivery'),
	('Demand'), ('Department'), ('Departure'), ('Dependent'), ('Deposit'), ('Depression'), ('Depth'), ('Description'), ('Design'), ('Designer'), ('Desire'),
	('Desk'), ('Detail'), ('Development'), ('Device'), ('Devil'), ('Diamond'), ('Diet'), ('Difference'), ('Difficulty'), ('Dig'), ('Dimension'),
	('Dinner'), ('Direction'), ('Director'), ('Dirt'), ('Disaster'), ('Discipline'), ('Discount'), ('Discussion'), ('Disease'), ('Dish'), ('Disk'),
	('Display'), ('Distance'), ('Distribution'), ('District'), ('Divide'), ('Doctor'), ('Document'), ('Dog'), ('Door'), ('Dot'), ('Double'),
	('Doubt'), ('Draft'), ('Drag'), ('Drama'), ('Draw'), ('Drawer'), ('Drawing'), ('Dream'), ('Dress'), ('Drink'), ('Drive'),
	('Driver'), ('Drop'), ('Drunk'), ('Due'), ('Dump'), ('Dust'), ('Duty'), ('Ear'), ('Earth'), ('Ease'), ('East'),
	('Eat'), ('Economics'), ('Economy'), ('Edge'), ('Editor'), ('Education'), ('Effect'), ('Effective'), ('Efficiency'), ('Effort'), ('Egg'),
	('Election'), ('Elevator'), ('Emergency'), ('Emotion'), ('Emphasis'), ('Employ'), ('Employee'), ('Employer'), ('Employment'), ('End'), ('Energy'),
	('Engine'), ('Engineer'), ('Engineering'), ('Entertainment'), ('Enthusiasm'), ('Entrance'), ('Entry'), ('Environment'), ('Equal'), ('Equipment'), ('Equivalent'),
	('Error'), ('Escape'), ('Essay'), ('Establishment'), ('Estate'), ('Estimate'), ('Evening'), ('Event'), ('Evidence'), ('Exam'), ('Examination'),
	('Example'), ('Exchange'), ('Excitement'), ('Excuse'), ('Exercise'), ('Exit'), ('Experience'), ('Expert'), ('Explanation'), ('Expression'), ('Extension'),
	('Extent'), ('External'), ('Extreme'), ('Eye'), ('Eyeglasses'), ('Eyes'), ('Face'), ('Fact'), ('Factor'), ('Fail'), ('Failure'),
	('Fall'), ('Familiar'), ('Family'), ('Fan'), ('Farm'), ('Farmer'), ('Fat'), ('Father'), ('Fault'), ('Fear'), ('Feature'),
	('Fee'), ('Feed'), ('Feedback'), ('Feel'), ('Feeling'), ('Female'), ('Few'), ('Field'), ('Fight'), ('Figure'), ('File'),
	('Fill'), ('Film'), ('Final'), ('Finance'), ('Finding'), ('Finger'), ('Finish'), ('Fire'), ('Fish'), ('Fishing'), ('Fix'),
	('Flight'), ('Flock'), ('Floor'), ('Flow'), ('Flower'), ('Flowers'), ('Fly'), ('Focus'), ('Fold'), ('Following'), ('Food'),
	('Foot'), ('Football'), ('Force'), ('Forever'), ('Form'), ('Formal'), ('Fortune'), ('Foundation'), ('Frame'), ('Freedom'), ('Friend'),
	('Friendship'), ('Front'), ('Fruit'), ('Fuel'), ('Fun'), ('Function'), ('Funeral'), ('Funny'), ('Future'), ('Gain'), ('Game'),
	('Gap'), ('Garage'), ('Garbage'), ('Garden'), ('Gas'), ('Gate'), ('Gather'), ('Gear'), ('Gene'), ('General'), ('Gift'),
	('Girl'), ('Girlfriend'), ('Give'), ('Glad'), ('Glass'), ('Glove'), ('Go'), ('Goal'), ('God'), ('Gold'), ('Golf'),
	('Good'), ('Government'), ('Grab'), ('Grade'), ('Grand'), ('Grandfather'), ('Grandmother'), ('Grass'), ('Great'), ('Green'), ('Grocery'),
	('Ground'), ('Group'), ('Growth'), ('Guarantee'), ('Guard'), ('Guess'), ('Guest'), ('Guidance'), ('Guide'), ('Guitar'), ('Guy'),
	('Habit'), ('Hair'), ('Half'), ('Hall'), ('Hand'), ('Handle'), ('Hang'), ('Happiness'), ('Harm'), ('Hat'), ('Hate'),
	('Head'), ('Health'), ('Hearing'), ('Heart'), ('Heat'), ('Heavy'), ('Height'), ('Hell'), ('Hello'), ('Help'), ('Hero'),
	('Heroes'), ('Hide'), ('High'), ('Highlight'), ('Highway'), ('Hire'), ('Historian'), ('History'), ('Hit'), ('Hold'), ('Hole'),
	('Holiday'), ('Home'), ('Homework'), ('Honey'), ('Hook'), ('Hope'), ('Horror'), ('Horse'), ('Hospital'), ('Host'), ('Hotel'),
	('Hour'), ('House'), ('Housing'), ('Human'), ('Hunt'), ('Hurry'), ('Hurt'), ('Husband'), ('Ice'), ('Idea'), ('Ideal'),
	('If'), ('Illegal'), ('Image'), ('Imagination'), ('Impact'), ('Implement'), ('Importance'), ('Impress'), ('Impression'), ('Improvement'), ('Incident'),
	('Income'), ('Increase'), ('Independence'), ('Independent'), ('Indication'), ('Individual'), ('Industry'), ('Inevitable'), ('Inflation'), ('Influence'), ('Information'),
	('Initial'), ('Initiative'), ('Injury'), ('Insect'), ('Inside'), ('Inspection'), ('Inspector'), ('Instance'), ('Instruction'), ('Insurance'), ('Intention'),
	('Interaction'), ('Interest'), ('Internal'), ('International'), ('Internet'), ('Interview'), ('Introduction'), ('Investment'), ('Invite'), ('Iron'), ('Island'),
	('Issue'), ('It'), ('Item'), ('Jacket'), ('Job'), ('Join'), ('Joint'), ('Joke'), ('Judge'), ('Judgment'), ('Juice'),
	('Jump'), ('Junior'), ('Jury'), ('Keep'), ('Key'), ('Kick'), ('Kid'), ('Kill'), ('Kind'), ('King'), ('Kiss'),
	('Kitchen'), ('Knee'), ('Knife'), ('Knowledge'), ('Lab'), ('Lack'), ('Ladder'), ('Lady'), ('Lake'), ('Land'), ('Landscape'),
	('Language'), ('Laugh'), ('Law'), ('Lawyer'), ('Lay'), ('Layer'), ('Lead'), ('Leader'), ('Leadership'), ('Leading'), ('League'),
	('Leather'), ('Leave'), ('Lecture'), ('Leg'), ('Length'), ('Lesson'), ('Let'), ('Letter'), ('Level'), ('Library'), ('Lie'),
	('Life'), ('Lift'), ('Light'), ('Limit'), ('Line'), ('Link'), ('Lip'), ('List'), ('Listen'), ('Literature'), ('Living'),
	('Load'), ('Loan'), ('Local'), ('Location'), ('Lock'), ('Log'), ('Long'), ('Look'), ('Loss'), ('Love'), ('Low'),
	('Luck'), ('Lunch'), ('Machine'), ('Magazine'), ('Mail'), ('Main'), ('Maintenance'), ('Major'), ('Make'), ('Male'), ('Mall'),
	('Man'), ('Management'), ('Manager'), ('Manner'), ('Manufacturer'), ('Many'), ('Map'), ('March'), ('Mark'), ('Market'), ('Marketing'),
	('Marriage'), ('Master'), ('Match'), ('Matches'), ('Mate'), ('Material'), ('Math'), ('Matter'), ('Maximum'), ('Maybe'), ('Meal'),
	('Meaning'), ('Measurement'), ('Meat'), ('Media'), ('Medicine'), ('Medium'), ('Meet'), ('Meeting'), ('Member'), ('Membership'), ('Memory'),
	('Mention'), ('Menu'), ('Mess'), ('Message'), ('Metal'), ('Method'), ('Middle'), ('Midnight'), ('Might'), ('Milk'), ('Mind'),
	('Mine'), ('Minimum'), ('Minor'), ('Minute'), ('Mirror'), ('Miss'), ('Mission'), ('Mistake'), ('Mix'), ('Mixture'), ('Mobile'),
	('Mode'), ('Model'), ('Mom'), ('Moment'), ('Money'), ('Monitor'), ('Monkey'), ('Monkeys'), ('Month'), ('Mood'), ('Morning'),
	('Mortgage'), ('Most'), ('Mother'), ('Motor'), ('Mountain'), ('Mouse'), ('Mouth'), ('Move'), ('Movie'), ('Mud'), ('Muscle'),
	('Music'), ('Nail'), ('Name'), ('Nasty'), ('Nation'), ('National'), ('Native'), ('Natural'), ('Nature'), ('Neat'), ('Necessary'),
	('Neck'), ('Negative'), ('Negotiation'), ('Nerve'), ('Net'), ('Network'), ('New York'), ('News'), ('Newspaper'), ('Night'), ('Nobody'),
	('Noise'), ('Normal'), ('North'), ('Nose'), ('Note'), ('Nothing'), ('Notice'), ('Novel'), ('Number'), ('Nurse'), ('Object'),
	('Objective'), ('Obligation'), ('Occasion'), ('Ocean'), ('Offer'), ('Office'), ('Officer'), ('Official'), ('Oil'), ('One'), ('Opening'),
	('Operation'), ('Opinion'), ('Opportunity'), ('Opposite'), ('Option'), ('Orange'), ('Order'), ('Ordinary'), ('Organization'), ('Original'), ('Other'),
	('Outcome'), ('Outside'), ('Oven'), ('Owner'), ('Pace'), ('Pack'), ('Package'), ('Page'), ('Pain'), ('Paint'), ('Painting'),
	('Pair'), ('Panic'), ('Paper'), ('Parent'), ('Park'), ('Parking'), ('Part'), ('Particular'), ('Partner'), ('Party'), ('Pass'),
	('Passage'), ('Passenger'), ('Passion'), ('Past'), ('Path'), ('Patience'), ('Patient'), ('Pattern'), ('Pause'), ('Pay'), ('Payment'),
	('Peace'), ('Peak'), ('Pen'), ('Penalty'), ('Pension'), ('People'), ('Percentage'), ('Perception'), ('Performance'), ('Period'), ('Permission'),
	('Permit'), ('Person'), ('Personal'), ('Personality'), ('Perspective'), ('Phase'), ('Philosophy'), ('Phone'), ('Photo'), ('Photograph'), ('Phrase'),
	('Physical'), ('Physics'), ('Piano'), ('Pick'), ('Picture'), ('Pie'), ('Piece'), ('Pigtails'), ('Pin'), ('Pipe'), ('Pitch'),
	('Pizza'), ('Place'), ('Plan'), ('Plane'), ('Plant'), ('Plastic'), ('Plate'), ('Platform'), ('Play'), ('Player'), ('Pleasure'),
	('Plenty'), ('Poem'), ('Poet'), ('Poetry'), ('Point'), ('Police'), ('Policy'), ('Politics'), ('Pollution'), ('Pool'), ('Pop'),
	('Population'), ('Position'), ('Positive'), ('Possession'), ('Possibility'), ('Possible'), ('Post'), ('Pot'), ('Potato'), ('Potential'), ('Pound'),
	('Power'), ('Practice'), ('Preference'), ('Preparation'), ('Presence'), ('Present'), ('Presentation'), ('President'), ('Press'), ('Pressure'), ('Price'),
	('Pride'), ('Priest'), ('Primary'), ('Principle'), ('Print'), ('Prior'), ('Priority'), ('Private'), ('Prize'), ('Problem'), ('Procedure'),
	('Process'), ('Produce'), ('Product'), ('Profession'), ('Professional'), ('Professor'), ('Profile'), ('Profit'), ('Program'), ('Progress'), ('Project'),
	('Promise'), ('Promotion'), ('Prompt'), ('Proof'), ('Property'), ('Proposal'), ('Protection'), ('Psychology'), ('Public'), ('Pull'), ('Punch'),
	('Purchase'), ('Purple'), ('Purpose'), ('Push'), ('Put'), ('Quality'), ('Quantity'), ('Quarter'), ('Queen'), ('Question'), ('Quiet'),
	('Quit'), ('Quote'), ('Race'), ('Radio'), ('Rain'), ('Raise'), ('Range'), ('Rate'), ('Ratio'), ('Raw'), ('Reach'),
	('Reaction'), ('Read'), ('Reading'), ('Reality'), ('Reason'), ('Reception'), ('Recipe'), ('Recognition'), ('Recommendation'), ('Record'), ('Recording'),
	('Recover'), ('Red'), ('Reference'), ('Reflection'), ('Refrigerator'), ('Refuse'), ('Region'), ('Register'), ('Regret'), ('Regular'), ('Relation'),
	('Relationship'), ('Relative'), ('Release'), ('Relief'), ('Religion'), ('Remote'), ('Remove'), ('Rent'), ('Repair'), ('Repeat'), ('Replacement'),
	('Reply'), ('Report'), ('Representative'), ('Republic'), ('Reputation'), ('Request'), ('Requirement'), ('Research'), ('Reserve'), ('Resident'), ('Resist'),
	('Resolution'), ('Resolve'), ('Resort'), ('Resource'), ('Respect'), ('Respond'), ('Response'), ('Responsibility'), ('Rest'), ('Restaurant'), ('Result'),
	('Return'), ('Reveal'), ('Revenue'), ('Review'), ('Revolution'), ('Reward'), ('Rice'), ('Rich'), ('Ride'), ('Ring'), ('Rip'),
	('Rise'), ('Risk'), ('River'), ('Road'), ('Rock'), ('Role'), ('Roll'), ('Roof'), ('Room'), ('Rope'), ('Rough'),
	('Round'), ('Routine'), ('Row'), ('Royal'), ('Rub'), ('Ruin'), ('Rule'), ('Run'), ('Rush'), ('Sad'), ('Safe'),
	('Safety'), ('Sail'), ('Salad'), ('Salary'), ('Sale'), ('Salt'), ('Sample'), ('Sand'), ('Sandwich'), ('Satisfaction'), ('Save'),
	('Savings'), ('Scale'), ('Scene'), ('Schedule'), ('Scheme'), ('School'), ('Science'), ('Score'), ('Scratch'), ('Screen'), ('Screw'),
	('Script'), ('Sea'), ('Search'), ('Season'), ('Seat'), ('Second'), ('Secret'), ('Secretary'), ('Section'), ('Sector'), ('Security'),
	('Selection'), ('Self'), ('Sell'), ('Senior'), ('Sense'), ('Sensitive'), ('Sentence'), ('Series'), ('Serve'), ('Service'), ('Session'),
	('Set'), ('Setting'), ('Sex'), ('Shake'), ('Shame'), ('Shape'), ('Share'), ('She'), ('Shelter'), ('Shift'), ('Shine'),
	('Ship'), ('Ships'), ('Shirt'), ('Shock'), ('Shoe'), ('Shoot'), ('Shop'), ('Shopping'), ('Shot'), ('Shoulder'), ('Show'),
	('Shower'), ('Sick'), ('Side'), ('Sign'), ('Signal'), ('Signature'), ('Significance'), ('Silly'), ('Silver'), ('Simple'), ('Sing'),
	('Singer'), ('Single'), ('Sink'), ('Sir'), ('Sister'), ('Site'), ('Situation'), ('Size'), ('Skill'), ('Skin'), ('Skirt'),
	('Sky'), ('Sleep'), ('Slice'), ('Slide'), ('Slip'), ('Smell'), ('Smile'), ('Smoke'), ('Snow'), ('Snowflake'), ('Society'),
	('Sock'), ('Socks'), ('Soft'), ('Software'), ('Soil'), ('Solid'), ('Solution'), ('Somewhere'), ('Son'), ('Song'), ('Sort'),
	('Sound'), ('Soup'), ('Source'), ('South'), ('Space'), ('Spare'), ('Speaker'), ('Special'), ('Specialist'), ('Specific'), ('Speech'),
	('Speed'), ('Spell'), ('Spend'), ('Spirit'), ('Spiritual'), ('Spite'), ('Split'), ('Sport'), ('Spot'), ('Spray'), ('Spread'),
	('Spring'), ('Square'), ('Stable'), ('Staff'), ('Stage'), ('Stand'), ('Standard'), ('Star'), ('Start'), ('State'), ('Statement'),
	('Station'), ('Status'), ('Stay'), ('Steak'), ('Steal'), ('Step'), ('Stick'), ('Still'), ('Stock'), ('Stomach'), ('Stop'),
	('Storage'), ('Store'), ('Storm'), ('Story'), ('Strain'), ('Stranger'), ('Strategy'), ('Street'), ('Strength'), ('Stress'), ('Stretch'),
	('Strike'), ('String'), ('Strip'), ('Stroke'), ('Structure'), ('Struggle'), ('Student'), ('Studio'), ('Study'), ('Stuff'), ('Stupid'),
	('Style'), ('Subject'), ('Substance'), ('Success'), ('Suck'), ('Sugar'), ('Suggestion'), ('Suit'), ('Suitcase'), ('Summer'), ('Sun'),
	('Sunlight'), ('Supermarket'), ('Support'), ('Surgery'), ('Surprise'), ('Surround'), ('Survey'), ('Suspect'), ('Sweet'), ('Swim'), ('Swimming'),
	('Swing'), ('Switch'), ('Sympathy'), ('System'), ('Table'), ('Tablecloth'), ('Tackle'), ('Tale'), ('Talk'), ('Tank'), ('Tap'),
	('Target'), ('Task'), ('Taste'), ('Tax'), ('Tea'), ('Teach'), ('Teacher'), ('Teaching'), ('Team'), ('Tear'), ('Technology'),
	('Telephone'), ('Television'), ('Tell'), ('Temperature'), ('Temporary'), ('Tennis'), ('Tension'), ('Term'), ('Test'), ('Text'), ('Thanks'),
	('Theme'), ('Theory'), ('Thing'), ('Thought'), ('Throat'), ('Ticket'), ('Tie'), ('Till'), ('Time'), ('Tip'), ('Title'),
	('Today'), ('Toe'), ('Tomorrow'), ('Tone'), ('Tongue'), ('Tonight'), ('Tool'), ('Tooth'), ('Top'), ('Topic'), ('Total'),
	('Touch'), ('Tough'), ('Tour'), ('Tourist'), ('Towel'), ('Tower'), ('Town'), ('Track'), ('Trade'), ('Tradition'), ('Traffic'),
	('Train'), ('Trainer'), ('Training'), ('Transition'), ('Transportation'), ('Trash'), ('Travel'), ('Treat'), ('Tree'), ('Trick'), ('Trip'),
	('Trouble'), ('Truck'), ('Trust'), ('Truth'), ('Try'), ('Tune'), ('Turn'), ('Twist'), ('Two'), ('Type'), ('Uncle'),
	('Understanding'), ('Union'), ('Unique'), ('Unit'), ('University'), ('Upper'), ('Upstairs'), ('Use'), ('User'), ('Usual'), ('Vacation'),
	('Valuable'), ('Value'), ('Variation'), ('Variety'), ('Vast'), ('Vegetable'), ('Vehicle'), ('Version'), ('Video'), ('View'), ('Village'),
	('Violin'), ('Virus'), ('Visit'), ('Visual'), ('Voice'), ('Volume'), ('Wait'), ('Wake'), ('Walk'), ('Wall'), ('War'),
	('Warning'), ('Wash'), ('Watch'), ('Water'), ('Wave'), ('Way'), ('Weakness'), ('Wealth'), ('Wear'), ('Weather'), ('Web'),
	('Wedding'), ('Week'), ('Weekend'), ('Weight'), ('Weird'), ('Welcome'), ('West'), ('Western'), ('Wheel'), ('Whereas'), ('While'),
	('White'), ('Whole'), ('Wife'), ('Will'), ('Win'), ('Wind'), ('Window'), ('Wine'), ('Wing'), ('Winner'), ('Winter'),
	('Wish'), ('Witness'), ('Woman'), ('Wonder'), ('Wood'), ('Word'), ('Work'), ('Worker'), ('Working'), ('World'), ('Worry'),
	('Worth'), ('Wrap'), ('Writer'), ('Writing'), ('Yard'), ('Year'), ('Yellow'), ('Yesterday'), ('You'), ('Young'), ('Youth'), ('Zone')
;

INSERT INTO word (word_type_id, word)
SELECT word_type.id word_type_id, temp word FROM temp LEFT JOIN word_type ON word_type.type = 'noun'
;

DROP TABLE temp
;

-- //@UNDO
-- SQL to undo the change goes here.

DROP TABLE word
;
DROP TABLE word_type
;
DROP TABLE account_x_doll
;
DROP TABLE doll_x_image
;
DROP TABLE doll
;
DROP TABLE image_x_image_category
;
DROP TABLE image_set_x_image
;
DROP TABLE image
;
DROP TABLE image_category
;
DROP TABLE image_set
;
DROP TABLE account_x_role
;
DROP TABLE role
;
DROP TABLE account
;

