<div class="col s12 m5 l5">
            <div class="card small">
                <div class="card-image">
                    <img src="<?= $imageUrl ? $imageUrl : base_url() . 'img/profile/sample_img.jpg' ?>">
                </div>
                <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4">
                        <span><?= $name ? $name : '' ?></span>
                        <i class="material-icons right profileEditBtn">more_vert</i>
                    </span>
                    <div class="row">
                        <span class="col s4 card-sub-title">Contact</span>
                        <span class="col s8"><?= $contact ? $contact : '' ?></span>
                        <!-- <span class="col s12" id="babySleepStatus">Last sleeped at 2 hours ago</span> -->
                    </div>
                </div>
            </div>
        </div>