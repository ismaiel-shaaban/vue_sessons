<template>
    <div class="add-tour min-vh-100">
        <HeaderComp></HeaderComp>
        <div class="container py-5">
            <div class="box p-3 px-4 rounded-2">
                <h2 class="fs-5 mb-4">اضف برنامج جديد</h2>
                <div class="group-1 d-flex gap-3 flex-md-row flex-column">
                    <label class="w-100">
                        <span class="d-block mb-1 ">وجهة البرنامج: </span>
                        <select name="programme destination" v-model="allInfo.return_airline">
                            <option value="" disabled selected>--اختر--</option>
                            <option :value="item.id" v-for="(item, index) in cities" :key="index">
                                {{ item.name }}
                            </option>
                        </select>
                        <span v-if="validation.return_airline.$error" class="text-danger fst-italic d-block mt-1">
                            {{ validation.return_airline.required.$message }}
                        </span>
                    </label>
                    <label class="w-100">
                        <span class="d-block mb-1 ">عنوان البرنامج: </span>
                        <input type="text" v-model="allInfo.program_title_arabic">
                        <span v-if="validation.program_title_arabic.$error" class="text-danger fst-italic d-block mt-1">
                            {{ validation.program_title_arabic.required.$message }}
                        </span>
                    </label>
                    <label class="w-100">
                        <span class="d-block mb-1 ">عنوان بالانجليزي: </span>
                        <input type="text" v-model="allInfo.program_title_english">
                        <span v-if="validation.program_title_english.$error" class="text-danger fst-italic d-block mt-1">
                            {{ validation.program_title_english.required.$message }}
                        </span>
                    </label>
                </div>
                <div class="group-2 mt-5 d-flex gap-3 flex-md-row flex-column">
                    <div class="d-flex gap-3 w-100">
                        <label class="w-100">
                            <span class="d-block mb-1 ">عدد الأيام: </span>
                            <input type="number" min="0" v-model="allInfo.num_of_days">
                        </label>
                        <label class="w-100">
                            <span class="d-block mb-1 ">عدد الليالي: </span>
                            <input class="" type="number" min="0" v-model="allInfo.num_of_nights">
                        </label>
                    </div>
                    <label class="w-100">
                        <span class="d-block mb-1 ">التاريخ من: </span>
                        <input type="date" :min="new Date().toLocaleDateString('en-CA')" v-model="allInfo.from_date">
                    </label>
                    <label class="w-100">
                        <span class="d-block mb-1 ">التاريخ الي: </span>
                        <input type="date" :min="new Date().toLocaleDateString('en-CA')" v-model="allInfo.to_date">
                    </label>
                </div>
                <div class="group-3 pb-5 mt-4 d-flex gap-3 flex-md-row flex-column">
                    <label class="w-100">
                        <span class="d-block mb-1 ">نوع السيارة: </span>
                        <select name="car type" v-model="allInfo.car_type">
                            <option value="" disabled selected>--اختر--</option>
                            <option :value="item.id" v-for="(item, index) in cars" :key="index">
                                {{ item.name }}
                            </option>
                        </select>
                        <span v-if="validation.car_type.$error" class="text-danger fst-italic d-block mt-1">
                            {{ validation.car_type.required.$message }}
                        </span>
                    </label>
                    <label class="w-100">
                        <span class="d-block mb-1 ">نوع الوجبات: </span>
                        <select name="meals type" v-model="allInfo.meal_type">
                            <option value="" disabled selected>--اختر--</option>
                            <option value="without breakfast">بدون فطور</option>
                            <option value="with breakfast">مع فطور</option>
                            <option value="breakfast and lunch">افطار و غداء</option>
                            <option value="FB">اقامه كامله (فطور و غداء و عشاء)</option>
                        </select>
                        <span v-if="validation.meal_type.$error" class="text-danger fst-italic d-block mt-1">
                            {{ validation.meal_type.required.$message }}
                        </span>
                    </label>
                    <label class="w-100">
                        <span class="d-block mb-1 ">يشمل الطيران: </span>
                        <select name="includes flights" v-model="allInfo.includes_flight">
                            <option value="" disabled selected>--اختر--</option>
                            <option value="1">يشمل الطيران</option>
                            <option value="0">لا يشمل الطيران</option>
                        </select>
                        <span v-if="validation.includes_flight.$error" class="text-danger fst-italic d-block mt-1">
                            {{ validation.includes_flight.required.$message }}
                        </span>
                    </label>
                </div>
                <!-- ------------------- Separator ------------------- -->

                <!-- Flights Adding -->
                <div class="flights py-5" v-if="allInfo.includes_flight == '1'">
                    <div class="text-center">
                        <h3 class="fw-bold mb-3">تفاصيل الرحله</h3>
                        <p class="text-danger fw-bold">لكي يتم الربط بين حجز البرنامج و المقاعد في رحله الطيران يجب اختيار
                            رقم الرحله المراد ربطها بهذا البرنامح</p>
                    </div>
                    <div class="going special-group border-bottom mt-5 pb-5">
                        <h4 class="mb-4">رحله الذهاب:</h4>
                        <div class="inner d-flex gap-3 flex-md-row flex-column">
                            <label class="w-100">
                                <span class="d-block mb-1 ">خط الطيران: </span>
                                <select name="airline" v-model="allInfo.departure_airline">
                                    <option value="" disabled selected>--اختر--</option>
                                    <option :value="item.id" v-for="(item, index) in airLines" :key="index">
                                        {{ item.name_ar }}
                                    </option>
                                </select>
                            </label>
                            <label class="w-100">
                                <span class="d-block mb-1 ">الذهاب من: </span>
                                <select name="airline" v-model="allInfo.departure_from">
                                    <option value="" disabled selected>--اختر--</option>
                                    <option :value="item.id" v-for="(item, index) in airPorts" :key="index">
                                        {{ item.arabic_name }}
                                    </option>
                                </select>
                            </label>
                            <label class="w-100">
                                <span class="d-block mb-1 ">الوصول الي: </span>
                                <select name="airline" v-model="allInfo.arrival_to">
                                    <option value="" disabled selected>--اختر--</option>
                                    <option :value="item.id" v-for="(item, index) in airPorts" :key="index">
                                        {{ item.arabic_name }}
                                    </option>
                                </select>
                            </label>
                        </div>
                        <div class="text-center mt-3">
                            <button class="bg-primary fw-bold text-uppercase rounded-2 p-2 px-4 text-light opacity-hover"
                                @click.prevent="searchFlights">
                                بحث
                            </button>
                        </div>
                        <div class="responsive-table flights overflow-auto mt-5" dir="ltr" v-if="allFlights.length > 0">
                            <table>
                                <thead>
                                    <tr>
                                        <td class="text-center">#</td>
                                        <td>رقم الرحله</td>
                                        <td>وقت و تاريخ الوصول</td>
                                        <td>وقت و تاريخ الذهاب</td>
                                        <td>وقت و تاريخ الوصول</td>
                                        <td>وقت و تاريخ الذهاب</td>
                                        <td>الوزن المسموح بالكيلو جرام</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in allFlights" :key="index">
                                        <td class="text-center">
                                            {{ index }}
                                        </td>
                                        <td>
                                            {{ item.flightNumber }}
                                        </td>
                                        <td>
                                            {{ item.returnEndDate }} <br> {{ item.returnEndDate2 }}
                                        </td>
                                        <td>
                                            {{ item.returnStartDate }} <br> {{ item.returnEndDate1 }}
                                        </td>
                                        <td>
                                            {{ item.arrivDate22 }} <br> {{ item.arrivalTime }}
                                        </td>
                                        <td>
                                            {{ item.departureDate }} <br> {{ item.departureTime }}
                                        </td>
                                        <td>
                                            {{ item.allowedWeight }}
                                        </td>
                                        <td>
                                            <label>
                                                <input id="radio-butn" type="radio" name="flight" :value="item.flightNumber"
                                                    v-model="allInfo.flight_number">
                                                <span class="checkbox"></span>
                                            </label>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- Flights Adding -->

                <!-- ------------------- Separator ------------------- -->
                <div class="group-4 mt-5 d-flex gap-3 flex-md-row flex-column">
                    <label class="w-100">
                        <span class="d-block mb-1 ">سعر الشخص البالغ فردي: </span>
                        <div class="position-relative">
                            <input type="number" min="0" v-model="allInfo.price_per_adult_individual">
                            <i class="fa-solid fa-dollar-sign text-black-50"></i>
                        </div>
                    </label>
                    <label class="w-100">
                        <span class="d-block mb-1 ">سعر الشخص البالغ زوجي: </span>
                        <div class="position-relative">
                            <input type="number" min="0" v-model="allInfo.price_per_adult_double">
                            <i class="fa-solid fa-dollar-sign text-black-50"></i>
                        </div>
                    </label>
                    <label class="w-100">
                        <span class="d-block mb-1 ">سعر الشخص البالغ ثلاثي: </span>
                        <div class="position-relative">
                            <input type="number" min="0" v-model="allInfo.price_per_adult_triple">
                            <i class="fa-solid fa-dollar-sign text-black-50"></i>
                        </div>
                    </label>
                </div>
                <div class="group-5 mt-5 d-flex gap-3 flex-md-row flex-column">
                    <label class="w-100">
                        <span class="d-block mb-1 ">سعر الطفل بدون سرير: </span>
                        <div class="position-relative">
                            <input type="number" min="0" v-model="allInfo.price_per_child_no_bed">
                            <i class="fa-solid fa-dollar-sign text-black-50"></i>
                        </div>
                    </label>
                    <label class="w-100">
                        <span class="d-block mb-1 ">سعر الطفل مع سرير: </span>
                        <div class="position-relative">
                            <input type="number" min="0" v-model="allInfo.price_per_child_with_bed">
                            <i class="fa-solid fa-dollar-sign text-black-50"></i>
                        </div>
                    </label>
                    <label class="w-100">
                        <span class="d-block mb-1 ">سعر الرضيع: </span>
                        <div class="position-relative">
                            <input type="number" min="0" v-model="allInfo.price_per_infant">
                            <i class="fa-solid fa-dollar-sign text-black-50"></i>
                        </div>
                    </label>
                </div>
                <div class="group-6 pb-5 mt-5 d-flex gap-3">
                    <label class="w-100">
                        <span class="d-block mb-1 ">الضريبة: </span>
                        <div class="position-relative">
                            <input type="number" min="0" v-model="allInfo.tax">
                            <i class="fa-solid fa-percent text-black-50"></i>
                        </div>
                    </label>
                </div>
                <!-- ------------------- Separator ------------------- -->
                <div class="group-7 pb-5 mt-5 d-flex gap-3 flex-lg-row flex-column">
                    <label class="w-100">
                        <span class="d-block mb-1 ">تفاصيل البرنامج عربي: </span>
                        <TextEditor @getData="(content) => allInfo.program_details_arabic = content"></TextEditor>
                        <span v-if="validation.program_details_arabic.$error" class="text-danger fst-italic d-block mt-1">
                            {{ validation.program_details_arabic.required.$message }}
                        </span>
                    </label>
                    <label class="w-100">
                        <span class="d-block mb-1 ">تفاصيل البرنامج انجليزي: </span>
                        <TextEditor @getData="(content) => allInfo.program_details_english = content"></TextEditor>
                        <span v-if="validation.program_details_english.$error" class="text-danger fst-italic d-block mt-1">
                            {{ validation.program_details_english.required.$message }}
                        </span>
                    </label>
                </div>
                <!-- ------------------- Separator ------------------- -->
                <div class="group-8 pb-5 mt-5 d-flex gap-3 flex-column">
                    <label class="w-100">
                        <span class="d-block mb-3">صوره اساسية: </span>
                        <div class="d-flex justify-content-between align-items-center gap-4 flex-md-row flex-column">
                            <label for="first" class="browse-butn opacity-hover" type="button">
                                <input @change="getFirstImage($event)" id="first" class="d-none" type="file">
                                Browse
                            </label>
                            <div for="first" class="place-holder rounded-2 d-grid" v-if="imagePreview.first.path === ''">
                                <div class="text-center">
                                    <i class="image fa-solid fa-image text-black-50 fs-2 mb-2"></i>
                                    <span class="text-uppercase d-block fw-bold text-black-50 fs-5">Preview Image</span>
                                </div>
                            </div>
                            <div v-else>
                                <img  @contextmenu.prevent
      @touchstart.prevent class="img-fluid" width="250" :src="imagePreview.first.path" alt="">
                            </div>
                        </div>
                        <span v-if="validation.main_image.$error" class="text-danger fst-italic d-block mt-1">
                            {{ validation.main_image.required.$message }}
                        </span>
                    </label>
                    <label class="w-100">
                        <span class="d-block mb-3">صوره التفاصيل: </span>
                        <div class="d-flex justify-content-between align-items-center gap-4 flex-md-row flex-column">
                            <label for="second" class="browse-butn opacity-hover" type="button">
                                <input @change="getSecondImage($event)" id="second" class="d-none" type="file">
                                Browse
                            </label>
                            <div for="second" class="place-holder rounded-2 d-grid" v-if="imagePreview.second.path === ''">
                                <div class="text-center">
                                    <i class="image fa-solid fa-image text-black-50 fs-2 mb-2"></i>
                                    <span class="text-uppercase d-block fw-bold text-black-50 fs-5">Preview Image</span>
                                </div>
                            </div>
                            <div v-else>
                                <img  @contextmenu.prevent
      @touchstart.prevent class="img-fluid" width="250" :src="imagePreview.second.path" alt="">
                            </div>
                        </div>
                        <span v-if="validation.details_image.$error" class="text-danger fst-italic d-block mt-1">
                            {{ validation.details_image.required.$message }}
                        </span>
                    </label>

                    <label class="w-100">
                        <span class="d-block mb-3">صوره اضافيه 1: </span>
                        <div class="d-flex justify-content-between align-items-center gap-4 flex-md-row flex-column">
                            <label for="third" class="browse-butn opacity-hover" type="button">
                                <input @change="getThirdImage($event)" id="second" class="d-none" type="file">
                                Browse
                            </label>
                            <div for="third" class="place-holder rounded-2 d-grid" v-if="imagePreview.third.path === ''">
                                <div class="text-center">
                                    <i class="image fa-solid fa-image text-black-50 fs-2 mb-2"></i>
                                    <span class="text-uppercase d-block fw-bold text-black-50 fs-5">Preview Image</span>
                                </div>
                            </div>
                            <div v-else>
                                <img  @contextmenu.prevent
      @touchstart.prevent class="img-fluid" width="250" :src="imagePreview.third.path" alt="">
                            </div>
                        </div>
                        <!-- <span v-if="validation.image_1.$error" class="text-danger fst-italic d-block mt-1">
                            {{ validation.image_1.required.$message }}
                        </span> -->
                    </label>

                    <label class="w-100">
                        <span class="d-block mb-3">صوره اضافيه 2: </span>
                        <div class="d-flex justify-content-between align-items-center gap-4 flex-md-row flex-column">
                            <label for="fourth" class="browse-butn opacity-hover" type="button">
                                <input @change="getFourthImage($event)" id="second" class="d-none" type="file">
                                Browse
                            </label>
                            <div for="third" class="place-holder rounded-2 d-grid" v-if="imagePreview.fourth.path === ''">
                                <div class="text-center">
                                    <i class="image fa-solid fa-image text-black-50 fs-2 mb-2"></i>
                                    <span class="text-uppercase d-block fw-bold text-black-50 fs-5">Preview Image</span>
                                </div>
                            </div>
                            <div v-else>
                                <img  @contextmenu.prevent
      @touchstart.prevent class="img-fluid" width="250" :src="imagePreview.fourth.path" alt="">
                            </div>
                        </div>
                        <!-- <span v-if="validation.image_2.$error" class="text-danger fst-italic d-block mt-1">
                            {{ validation.image_2.required.$message }}
                        </span> -->
                    </label>

                    <label class="w-100">
                        <span class="d-block mb-3">صوره اضافيه 3: </span>
                        <div class="d-flex justify-content-between align-items-center gap-4 flex-md-row flex-column">
                            <label for="fifth" class="browse-butn opacity-hover" type="button">
                                <input @change="getFifthImage($event)" id="second" class="d-none" type="file">
                                Browse
                            </label>
                            <div for="third" class="place-holder rounded-2 d-grid" v-if="imagePreview.fifth.path === ''">
                                <div class="text-center">
                                    <i class="image fa-solid fa-image text-black-50 fs-2 mb-2"></i>
                                    <span class="text-uppercase d-block fw-bold text-black-50 fs-5">Preview Image</span>
                                </div>
                            </div>
                            <div v-else>
                                <img  @contextmenu.prevent
      @touchstart.prevent class="img-fluid" width="250" :src="imagePreview.fifth.path" alt="">
                            </div>
                        </div>
                        <!-- <span v-if="validation.image_3.$error" class="text-danger fst-italic d-block mt-1">
                            {{ validation.image_3.required.$message }}
                        </span> -->
                    </label>

                    <label class="w-100">
                        <span class="d-block mb-3">صوره اضافيه 4: </span>
                        <div class="d-flex justify-content-between align-items-center gap-4 flex-md-row flex-column">
                            <label for="six" class="browse-butn opacity-hover" type="button">
                                <input @change="getSixImage($event)" id="second" class="d-none" type="file">
                                Browse
                            </label>
                            <div for="third" class="place-holder rounded-2 d-grid" v-if="imagePreview.six.path === ''">
                                <div class="text-center">
                                    <i class="image fa-solid fa-image text-black-50 fs-2 mb-2"></i>
                                    <span class="text-uppercase d-block fw-bold text-black-50 fs-5">Preview Image</span>
                                </div>
                            </div>
                            <div v-else>
                                <img  @contextmenu.prevent
      @touchstart.prevent class="img-fluid" width="250" :src="imagePreview.six.path" alt="">
                            </div>
                        </div>
                        <!-- <span v-if="validation.image_4.$error" class="text-danger fst-italic d-block mt-1">
                            {{ validation.image_4.required.$message }}
                        </span> -->
                    </label>

                    <label class="w-100">
                        <span class="d-block mb-3">صوره اضافيه 5: </span>
                        <div class="d-flex justify-content-between align-items-center gap-4 flex-md-row flex-column">
                            <label for="seven" class="browse-butn opacity-hover" type="button">
                                <input @change="getSevenImage($event)" id="second" class="d-none" type="file">
                                Browse
                            </label>
                            <div for="third" class="place-holder rounded-2 d-grid" v-if="imagePreview.seven.path === ''">
                                <div class="text-center">
                                    <i class="image fa-solid fa-image text-black-50 fs-2 mb-2"></i>
                                    <span class="text-uppercase d-block fw-bold text-black-50 fs-5">Preview Image</span>
                                </div>
                            </div>
                            <div v-else>
                                <img  @contextmenu.prevent
      @touchstart.prevent class="img-fluid" width="250" :src="imagePreview.seven.path" alt="">
                            </div>
                        </div>
                        <!-- <span v-if="validation.image_5.$error" class="text-danger fst-italic d-block mt-1">
                            {{ validation.image_5.required.$message }}
                        </span> -->
                    </label>

                </div>
                <!-- ------------------- Separator ------------------- -->
                <div class="group-9 mt-5 d-flex gap-3 flex-column">
                    <div
                        class="head w-100 border-bottom border-black pb-4 d-flex align-items-center justify-content-between gap-3">
                        <h3 class="mb-0 w-50">المدن داخل البرنامج</h3>
                        <button @click="addCity" class="add-butn fw-bold rounded-2 opacity-hover bg-warning">
                            اضافة مدينة
                        </button>
                    </div>

                    <div class="responsive-table overflow-auto w-100" dir="ltr">
                        <table class="w-100">
                            <thead>
                                <tr>
                                    <td class="text-center">#</td>
                                    <td>المدينه</td>
                                    <td>اسم الفندق</td>
                                    <td>اسم الفندق انجليزي</td>
                                    <td>تاريخ التسجيل</td>
                                    <td>تاريخ المغادره</td>
                                    <td> الترتيب</td>
                                    <td>عدد الليالي</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="tableItems.length > 0" v-for="(item, index) in tableItems" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>
                                        <select class="w-100 px-2" name="city" v-model="item.city_name">
                                            <option value="" selected disabled>--اختر--</option>
                                            <option :value="item.id" v-for="(item, index) in cities" :key="index">
                                                {{ item.name }}
                                            </option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="text" v-model="item.hotel_name_arabic">
                                    </td>
                                    <td>
                                        <input type="text" v-model="item.hotel_name_english">
                                    </td>
                                    <td class="position-relative">
                                        <VueDatePicker v-model="item.registration_date"
                                            :min-date="new Date().toLocaleDateString('en-CA')" :enable-time-picker="false"
                                            model-type="yyyy-MM-dd" auto-apply :teleport="true"
                                            input-class-name="date-input" />
                                    </td>
                                    <td>
                                        <VueDatePicker v-model="item.departure_date"
                                            :min-date="new Date().toLocaleDateString('en-CA')" :enable-time-picker="false"
                                            model-type="yyyy-MM-dd" auto-apply :teleport="true"
                                            input-class-name="date-input" />
                                    </td>
                                    <td>
                                        <input class="px-2" type="number" min="1" v-model="item.num">
                                    </td>
                                    <td>
                                        <input class="px-2" type="number" min="0" v-model="item.num_of_nights">
                                    </td>
                                    <td>
                                        <button @click="deleteCity(item)"
                                            class="del-butn mx-auto p-3 d-flex bg-danger rounded-2 opacity-hover align-items-center justify-content-center">
                                            <i class="trash fa-solid fa-trash text-light"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <h4 v-if="tableItems.length === 0" class="text-uppercase fw-bold text-muted text-center py-5 mb-0">
                            Nothing To Show
                        </h4>
                    </div>
                </div>
                <div class="text-center">
                    <button class="text-uppercase fw-bold rounded-2 mt-5 bg-primary fs-5 opacity-hover text-light p-2 px-5"
                        @click.prevent="submission">
                        اضافه برنامج
                    </button>
                </div>
                <div style="font-weight: 700;" class="text-center text-danger mt-2" v-if="nightsAndValidation">{{ nightsAndValidation }}</div>
            </div>
        </div>
        <div class="alert alert-complete alert-success d-flex align-items-center gap-2 position-fixed" role="alert">
            <i class="fa-solid fa-circle-check"></i>
            <div>
                تمت العمليه بنجاح
            </div>
        </div>
        <div class="alert alert-error alert-danger d-flex align-items-center gap-2 position-fixed" role="alert">
            <i class="fa-solid fa-circle-xmark"></i>
            <div>
                لا توجد نتائج بحث
            </div>
        </div>
        <Loader v-if="loading" :position="'fixed'"></Loader>
    </div>
</template>

<script setup>
import HeaderComp from '../components/HeaderComp.vue';
import TextEditor from '../components/TextEditor.vue'
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import Loader from '../components/Loader.vue';
import '@vuepic/vue-datepicker/dist/main.css'
import VueDatePicker from '@vuepic/vue-datepicker';

const loading = ref(false)
const cities = ref([])
const airPorts = ref([])
const cars = ref([])
const airLines = ref([])
const tableItems = ref([])
const allFlights = ref([])
const allInfo = ref({
    return_airline: '',
    program_title_arabic: '',
    program_title_english: '',
    num_of_days: '0',
    num_of_nights: '0',
    from_date: new Date().toLocaleDateString('en-CA'),
    to_date: new Date().toLocaleDateString('en-CA'),
    car_type: '',
    meal_type: '',
    includes_flight: '',

    departure_airline: '',
    departure_from: '',
    arrival_to: '',
    flight_number: '',

    departure_time: null,
    arrival_time: null,
    allowed_weight_kg: null,
    return_from: null,
    return_to: null,
    return_departure_time: null,
    return_arrival_time: null,
    return_flight_number: null,
    return_allowed_weight_kg: null,

    price_per_adult_individual: '0',
    price_per_adult_double: '0',
    price_per_adult_triple: '0',
    price_per_child_no_bed: '0',
    price_per_child_with_bed: '0',
    price_per_infant: '0',
    tax: '0',
    program_details_arabic: '',
    program_details_english: '',
    main_image: '',
    details_image: '',
    // image_1: '',
    // image_2: '',
    // image_3: '',
    // image_4: '',
    // image_5: '',
})
const imagePreview = ref({
    first: {
        path: '',
        name: ''
    },
    second: {
        path: '',
        name: ''
    },
    third: {
        path: '',
        name: ''
    },
    fourth: {
        path: '',
        name: ''
    },
    fifth: {
        path: '',
        name: ''
    },
    six: {
        path: '',
        name: ''
    },
    seven: {
        path: '',
        name: ''
    },
})

const rules = {

}
for (let i = 0; i < Object.keys(allInfo.value).length; i++) {
    if (i >= 10 && i <= 23) {
        continue
    }
    rules[`${Object.keys(allInfo.value)[i]}`] = { required: helpers.withMessage("This field can't be empty", required) }
}
// watch(allInfo, newVal => {
//     if (newVal.includes_flight === '1') {
//         for (let i = 0; i < Object.keys(allInfo.value).length; i++) {
//             rules[`${Object.keys(allInfo.value)[i]}`] = { required: helpers.withMessage("This field can't be empty", required) }
//         }
//     } else {
//         for (let i = 0; i < Object.keys(allInfo.value).length; i++) {
//             if (i >= 10 && i <= 23) {
//                 continue
//             }
//             rules[`${Object.keys(allInfo.value)[i]}`] = { required: helpers.withMessage("This field can't be empty", required) }
//         }
//     }
// }, { deep: true })
const validation = useVuelidate(rules, allInfo)


const getFirstImage = (e) => {
    allInfo.value.main_image = e.target.files[0]
    imagePreview.value.first.path = URL.createObjectURL(e.target.files[0])
    imagePreview.value.first.name = e.target.files[0].name
}
const getSecondImage = (e) => {
    allInfo.value.details_image = e.target.files[0]
    imagePreview.value.second.path = URL.createObjectURL(e.target.files[0])
    imagePreview.value.second.name = e.target.files[0].name
}
const getThirdImage = (e) => {
    allInfo.value.image_1 = e.target.files[0]
    imagePreview.value.third.path = URL.createObjectURL(e.target.files[0])
    imagePreview.value.third.name = e.target.files[0].name
}
const getFourthImage = (e) => {
    allInfo.value.image_2 = e.target.files[0]
    imagePreview.value.fourth.path = URL.createObjectURL(e.target.files[0])
    imagePreview.value.fourth.name = e.target.files[0].name
}
const getFifthImage = (e) => {
    allInfo.value.image_3 = e.target.files[0]
    imagePreview.value.fifth.path = URL.createObjectURL(e.target.files[0])
    imagePreview.value.fifth.name = e.target.files[0].name
}
const getSixImage = (e) => {
    allInfo.value.image_4 = e.target.files[0]
    imagePreview.value.six.path = URL.createObjectURL(e.target.files[0])
    imagePreview.value.six.name = e.target.files[0].name
}
const getSevenImage = (e) => {
    allInfo.value.image_5 = e.target.files[0]
    imagePreview.value.seven.path = URL.createObjectURL(e.target.files[0])
    imagePreview.value.seven.name = e.target.files[0].name
}

const addCity = () => {
    tableItems.value.push({
        program_id: '',
        city_name: '',
        hotel_name_arabic: '',
        hotel_name_english: '',
        registration_date: new Date().toLocaleDateString("en-CA"),
        departure_date: new Date().toLocaleDateString("en-CA"),
        num_of_nights: '0',
        num: '0',
    })
}
const deleteCity = (item) => {
    tableItems.value = tableItems.value.filter(el => el !== item)
}
const searchFlights = async () => {
    loading.value = true
    await axios.get("https://seasonreal.seasonsge.com/appv1real/flights?all")
        .then(data => {
            allFlights.value = data.data.filter(el => {
                if (el.departureDate >= new Date().toLocaleDateString("en-CA") &&
                    el.flightLine === allInfo.value.departure_airline &&
                    el.fromAirport === allInfo.value.departure_from &&
                    el.toAirport === allInfo.value.arrival_to) {
                    loading.value = false
                    return el
                }
            })
            if (allFlights.value.length <= 0) {
                loading.value = false
                document.querySelector(".alert-error").classList.add("active")
                setTimeout(() => {
                    document.querySelector(".alert-error").classList.remove("active")
                }, 2000)
            }
        })
}


const nightsAndValidation = ref();
const submission = async () => {
    console.log(allInfo.value.num_of_days%allInfo.value.num_of_nights);
    validation.value.$touch()
    if(allInfo.value.num_of_days%allInfo.value.num_of_nights == 1){

// debugger
if (!validation.value.$error) {
        loading.value = true
        const formData = new FormData()

        formData.append("return_airline", allInfo.value.return_airline)
        formData.append("program_title_arabic", allInfo.value.program_title_arabic)
        formData.append("program_title_english", allInfo.value.program_title_english)
        formData.append("num_of_days", allInfo.value.num_of_days)
        formData.append("num_of_nights", allInfo.value.num_of_nights)
        formData.append("from_date", allInfo.value.from_date)
        formData.append("to_date", allInfo.value.to_date)
        formData.append("car_type", allInfo.value.car_type)
        formData.append("meal_type", allInfo.value.meal_type)
        formData.append("includes_flight", allInfo.value.includes_flight)

        formData.append("departure_airline", allInfo.value.departure_airline)
        formData.append("departure_from", allInfo.value.departure_from)
        formData.append("arrival_to", allInfo.value.arrival_to)
        formData.append("flight_number", allInfo.value.flight_number)

        formData.append("departure_time", allInfo.value.departure_time)
        formData.append("arrival_time", allInfo.value.arrival_time)
        formData.append("allowed_weight_kg", allInfo.value.allowed_weight_kg)
        formData.append("return_airline", allInfo.value.return_airline)
        formData.append("return_from", allInfo.value.return_from)
        formData.append("return_to", allInfo.value.return_to)
        formData.append("return_departure_time", allInfo.value.return_departure_time)
        formData.append("return_arrival_time", allInfo.value.return_arrival_time)
        formData.append("return_flight_number", allInfo.value.return_flight_number)
        formData.append("return_allowed_weight_kg", allInfo.value.return_allowed_weight_kg)

        formData.append("price_per_adult_individual", allInfo.value.price_per_adult_individual)
        formData.append("price_per_adult_double", allInfo.value.price_per_adult_double)
        formData.append("price_per_adult_triple", allInfo.value.price_per_adult_triple)
        formData.append("price_per_child_no_bed", allInfo.value.price_per_child_no_bed)
        formData.append("price_per_child_with_bed", allInfo.value.price_per_child_with_bed)
        formData.append("price_per_infant", allInfo.value.price_per_infant)
        formData.append("tax", allInfo.value.tax)
        formData.append("program_details_arabic", allInfo.value.program_details_arabic)
        formData.append("program_details_english", allInfo.value.program_details_english)
        formData.append("main_image", allInfo.value.main_image)
        formData.append("details_image", allInfo.value.details_image)
        formData.append("image_1", allInfo.value.image_1)
        formData.append("image_2", allInfo.value.image_2)
        formData.append("image_3", allInfo.value.image_3)
        formData.append("image_4", allInfo.value.image_4)
        formData.append("image_5", allInfo.value.image_5)

        await axios.post("https://seasonreal.seasonsge.com/appv1real/program-add", formData)
            .then(response => {
                // debugger
                // console.log(response)
                if (tableItems.value.length > 0) {
                    tableItems.value.forEach(el => {
                        el.program_id = response.data.program_id
                        axios.post("https://seasonreal.seasonsge.com/appv1real/tour-city", el).then(innerResponse => {
                            // console.log(innerResponse);
                            loading.value = false
                            document.querySelector(".alert-complete").classList.add("active")
                            setTimeout(() => {
                                document.querySelector(".alert-complete").classList.remove("active")
                            }, 3000)
                        })
                    })
                } else {
                    loading.value = false
                    document.querySelector(".alert-complete").classList.add("active")
                    setTimeout(() => {
                        document.querySelector(".alert-complete").classList.remove("active")
                    }, 3000)
                }
                console.log(response)
            })
    }

    }else{
        nightsAndValidation.value = "يجيب ان يكون عدد الايام اكبر من عدد الليالى بيوم واحد";
        setTimeout(() => {
            nightsAndValidation.value = ''
            /*  اى خدمة ياحج عمرو هههه ههههه */
        }, 3000);
    }
    
}


onMounted(async () => {
    loading.value = true
    await axios.get("https://seasonreal.seasonsge.com/appv1real/cities-view")
        .then(data => {
            cities.value = data.data
        })
    await axios.get("https://seasonreal.seasonsge.com/appv1real/viewAirports")
        .then(data => {
            if (data.data.success) {
                airPorts.value = data.data.data
            }
        })
    await axios.get("https://seasonreal.seasonsge.com/appv1real/cars-type-view")
        .then(data => {
            cars.value = data.data
        })
    await axios.get("https://seasonreal.seasonsge.com/appv1real/airlines-view")
        .then(data => {
            if (data.data.success) {
                airLines.value = data.data.airlines
                loading.value = false
            }
        })
})
</script>

<style lang="scss" scoped>
.alert {
    top: -50%;
    left: 50%;
    transition: 0.2s;
    transform: translateX(-50%);

    &.active {
        top: 5%;
    }
}

.add-tour {
    background-color: var(--bg-color);

    .box {
        background-color: var(--white-color);

        input,
        select {
            padding: 8px 20px;
            border: 1px solid #c0c0c0;
            border-radius: 5px;
            width: 100%;

            &.error {
                border-color: #dc3545;
            }
        }

        .group-3,
        .group-6,
        .group-7,
        .group-8 {
            border-bottom: 1px solid rgb(207, 207, 207);
        }

        i {
            &:not(.image, .trash) {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: 10px;
            }
        }

        .browse-butn {
            background-color: #dc3545;
            padding: 10px 20px;
            border-radius: 5px;
            color: var(--white-color);
            font-weight: 500;
        }

        .place-holder {
            width: 250px;
            height: 150px;
            place-items: center;
            border: 2px dashed gray;
        }

        .add-butn {
            padding: 10px 15px;
        }

        .responsive-table {
            &.flights {
                input {
                    display: none;

                    &:checked {
                        &+.checkbox {
                            background-color: #dc3545;

                            &::before {
                                transform: scale(1);
                            }
                        }
                    }
                }

                .checkbox {
                    display: block;
                    width: 25px;
                    height: 25px;
                    border-radius: 5px;
                    border: 1px solid #dc3545;
                    position: relative;
                    transition: 0.2s;
                    cursor: pointer;

                    &::before {
                        content: '\f00c';
                        font-weight: bold;
                        font-family: 'fontawesome';
                        color: var(--white-color);
                        transition: 0.2s;
                        transform: scale(0);
                    }
                }
            }

            td {
                width: 200px;
            }

            thead {
                td {
                    padding: 10px 15px;
                    background-color: gray;
                    color: white;
                    border: 1px solid gray;
                    text-wrap: nowrap;
                }
            }

            tbody {
                td {
                    border: 1px solid gray;
                    padding: 10px;
                    text-align: center;
                    text-wrap: nowrap;

                    select {
                        width: 100px !important;
                    }
                }
            }
        }
    }
}
</style>