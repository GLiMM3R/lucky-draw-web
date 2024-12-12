<template>
    <div :class="['dropZone', dragging ? 'dropZone-over' : '']" @dragenter="dragging = true" @dragleave="dragging = false">
        <VBtn v-if="selectFile || propImage" variant="text" class="text-none removeBtn" color="red" icon="mdi-close-circle"
            @click="removeImage"></VBtn>
        <div @drag="onFileChange">
            <div class="dropZone-info">
                <div v-if="selectFile || propImage">
                    <VIcon size="34" class="change-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="34px" height="34px" viewBox="0 0 34 34" fill="none">
                            <path
                                d="M17.085 28.9L21.93 24.0975L17.085 19.295L15.3 21.08L17.1275 22.9075C16.3342 22.9358 15.5618 22.8083 14.8104 22.525C14.059 22.2417 13.3864 21.8025 12.7925 21.2075C12.2258 20.6408 11.7935 19.9892 11.4954 19.2525C11.1973 18.5158 11.0489 17.7792 11.05 17.0425C11.05 16.5608 11.114 16.0792 11.2421 15.5975C11.3702 15.1158 11.547 14.6483 11.7725 14.195L9.9025 12.325C9.42083 13.0333 9.06667 13.7842 8.84 14.5775C8.61333 15.3708 8.5 16.1783 8.5 17C8.5 18.0767 8.7125 19.1392 9.1375 20.1875C9.5625 21.2358 10.1858 22.1708 11.0075 22.9925C11.8292 23.8142 12.75 24.4307 13.77 24.8421C14.79 25.2535 15.8383 25.4728 16.915 25.5L15.3 27.115L17.085 28.9ZM24.0975 21.675C24.5792 20.9667 24.9333 20.2158 25.16 19.4225C25.3867 18.6292 25.5 17.8217 25.5 17C25.5 15.9233 25.2943 14.8535 24.8829 13.7904C24.4715 12.7273 23.8555 11.7855 23.035 10.965C22.2133 10.1433 21.2851 9.53417 20.2504 9.1375C19.2157 8.74083 18.1605 8.5425 17.085 8.5425L18.7 6.885L16.915 5.1L12.07 9.9025L16.915 14.705L18.7 12.92L16.83 11.05C17.595 11.05 18.3742 11.199 19.1675 11.4971C19.9608 11.7952 20.6408 12.227 21.2075 12.7925C21.7742 13.3592 22.2065 14.0108 22.5046 14.7475C22.8027 15.4842 22.9511 16.2208 22.95 16.9575C22.95 17.4392 22.886 17.9208 22.7579 18.4025C22.6298 18.8842 22.453 19.3517 22.2275 19.805L24.0975 21.675ZM17 34C14.6483 34 12.4383 33.5535 10.37 32.6604C8.30167 31.7673 6.5025 30.5564 4.9725 29.0275C3.4425 27.4975 2.23153 25.6983 1.3396 23.63C0.447667 21.5617 0.00113333 19.3517 0 17C0 14.6483 0.446533 12.4383 1.3396 10.37C2.23267 8.30167 3.44363 6.5025 4.9725 4.9725C6.5025 3.4425 8.30167 2.23153 10.37 1.3396C12.4383 0.447667 14.6483 0.00113333 17 0C19.3517 0 21.5617 0.446533 23.63 1.3396C25.6983 2.23267 27.4975 3.44363 29.0275 4.9725C30.5575 6.5025 31.769 8.30167 32.6621 10.37C33.5552 12.4383 34.0011 14.6483 34 17C34 19.3517 33.5535 21.5617 32.6604 23.63C31.7673 25.6983 30.5564 27.4975 29.0275 29.0275C27.4975 30.5575 25.6983 31.769 23.63 32.6621C21.5617 33.5552 19.3517 34.0011 17 34Z"
                                fill="#028947" />
                        </svg>
                    </VIcon>
                    <VImg :src="previewImage" cover width="320" height="240" />
                </div>
                <div v-else class="dropZone-detail">
                    <VImg :src="UploadImage" width="160" class="mx-auto" />
                    <span class="dropZone-title">{{ props.title }}</span>
                    <div class="dropZone-upload-limit-info">
                        <div>{{ props.description }}</div>
                    </div>
                </div>
            </div>
            <input type="file" @change="onFileChange">
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'vue-toast-notification';
import useImage from '@/composables/useImage'
import UploadImage from '@/assets/images/upload_img.png'

const emit = defineEmits(['handleGetImage', 'handleRemove'])
const props = defineProps(['image', 'title', 'description', 'height'])

const { getImage } = useImage();
const $toast = useToast();

const propImage = ref();
const selectFile = ref();
const previewImage = ref();
const dragging = ref(false)

propImage.value = props.image

if (props.image) {
    previewImage.value = await getImage(props.image)
}

const removeImage = () => {
    selectFile.value = '';
    previewImage.value = null;
    propImage.value = null;
    emit('handleRemove')
}

const onFileChange = (event: any) => {
    var files = event.target.files || event.dataTransfer.files;
    if (!files.length) {
        dragging.value = false;
        previewImage.value = null
        selectFile.value = null;
        return;
    }

    let reader = new FileReader();
    reader.onload = (e) => {
        previewImage.value = e.target?.result;
    }

    createFile(files[0]);
    reader.readAsDataURL(event.target.files[0])

    emit('handleGetImage', selectFile.value)
}

const createFile = (file: File) => {
    if (!file.type.match('image.*')) {
        $toast.warning('please select image file');
        dragging.value = false;
        return;
    }

    if (file.size > 10000000) {
        alert('please check file size no over 10MB.')
        dragging.value = false;
        return;
    }

    selectFile.value = file;
    dragging.value = false;
};
</script>

<style scoped lang="scss">
.dropZone {
    width: 100%;
    height: 220px;
    flex-shrink: 0;
    position: relative;
    border: 2px dashed #eee;
    border-radius: 8px;
    overflow: hidden;
    background-color: rgba(145, 158, 171, 0.16);
}

.removeBtn {
    display: none;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 20;
}

.change-icon {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 10;
}

.dropZone:hover {
    border: 2px dashed rgba(2, 137, 71, 0.3);

    .removeBtn {
        display: block;
    }

    .change-icon {
        display: none;
    }
}

.dropZone:hover .dropZone-title {
    color: #028947;
}

.dropZone-info {
    color: #A8A8A8;
    width: 100%;
    height: 220px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.dropZone-detail {
    cursor: pointer;

    .dropZone-title {
        color: #787878;
        font-weight: 600;
        font-size: 16px;
    }

    .dropZone-upload-limit-info {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        padding: 0 10px;
        font-size: 14px;

        & span {
            color: #028947;
            padding-bottom: 1px;
            border-bottom: 1px solid #028947;
        }
    }

}

.dropZone input {
    position: absolute;
    cursor: pointer;
    top: 0px;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 10;
}



.dropZone-over {
    background: rgba(2, 137, 71, 0.2);
    opacity: 0.9;
}
</style>