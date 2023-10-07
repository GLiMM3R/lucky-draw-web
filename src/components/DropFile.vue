<template>
    <div>
        <div :class="['dropZone', dragging ? 'dropZone-over' : '']" @dragenter="dragging = true"
            @dragleave="dragging = false">
            <div @drag="onFileChange">
                <div v-if="selectFile" class="dropZone-info">
                    <!-- <span class="fa fa-cloud-upload dropZone-title"></span> -->
                    <span class="dropZone-title">Select file</span>
                    <div class="dropZone-upload-limit-info">
                        <div>Drop file or click <span>browse</span> through</div>
                        <div>your machine</div>
                    </div>
                    <VImg :src="previewImage" cover class="img" />
                </div>
                <div v-else class="dropZone-info">
                    <VImg :src="previewImage" cover class="preview-img" />
                </div>
                <input type="file" @change="onFileChange">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'vue-toast-notification';
import useImage from '@/composables/useImage'

const { getImage } = useImage();
const $toast = useToast();
const selectFile = ref(null);
const previewImage = ref('');
const dragging = ref(false)
const emit = defineEmits(['getImage'])
const props = defineProps(['image'])

if (props.image) {
    previewImage.value = await getImage(props.image)
}

const onFileChange = (event: Event) => {
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

    emit('getImage', selectFile.value)
}

const createFile = (file: File) => {
    if (!file.type.match('image.*')) {
        $toast.warning('please select image file');
        dragging.value = false;
        return;
    }

    if (file.size > 5000000) {
        alert('please check file size no over 5 MB.')
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
    height: 240px;
    position: relative;
    border: 2px dashed #eee;
    border-radius: 8px;

    .img {
        object-fit: cover;
        height: 100%;
        opacity: 0.8;
    }
}

.preview-img {
    object-fit: cover;
    height: 100%;
    opacity: 0.8;
}

.dropZone:hover {
    border: 2px dashed rgba(2, 137, 71, 0.3);
}

.dropZone-title {
    color: #787878;
    font-weight: 600;
    font-size: 18px;
}

.dropZone:hover .dropZone-title {
    color: #028947;
}

.dropZone-info {
    color: #A8A8A8;
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translate(0, -50%);
    text-align: center;
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
}

.dropZone-upload-limit-info {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;

    & span {
        color: #028947;
        padding-bottom: 1px;
        border-bottom: 1px solid #028947;
    }
}

.dropZone-over {
    background: rgba(2, 137, 71, 0.2);
    opacity: 0.9;
}
</style>