<template>
    <div class="desc-cont rounded-2 p-3 d-flex flex-column template-input" dir="ltr">
        <editor-content class="editor" :editor="editor" :dir="editor.isActive({ textAlign: 'right' }) ? 'rtl' : 'ltr'" />
        <div class="options pt-2 d-flex align-items-center gap-2 flex-wrap">
            <div class="group-1 d-flex align-items-center gap-2">
                <i :class="`fa-solid fa-bold ${editor.isActive('bold') ? 'active' : ''}`"
                    @click="editor.chain().focus().toggleBold().run()"></i>
                <i :class="`fa-solid fa-italic ${editor.isActive('italic') ? 'active' : ''}`"
                    @click="editor.chain().focus().toggleItalic().run()"></i>
                <i :class="`fa-solid fa-underline ${editor.isActive('underline') ? 'active' : ''}`"
                    @click="editor.chain().focus().toggleUnderline().run()"></i>
            </div>
            <div class="group-2 d-flex align-items-center gap-2">
                <i :class="`fa-solid fa-list-ol ${editor.isActive('orderedList') ? 'active' : ''}`"
                    @click="editor.chain().focus().toggleOrderedList().run()"></i>
                <i :class="`fa-solid fa-list-ul ${editor.isActive('bulletList') ? 'active' : ''}`"
                    @click="editor.chain().focus().toggleBulletList().run()"></i>
            </div>
            <div class="group-3 position-relative">
                <div class="aligning d-flex gap-3" @click="openAlignment = !openAlignment">
                    <i
                        :class="`fa-solid fa-align-${editor.isActive({ textAlign: 'left' }) ? 'left' : editor.isActive({ textAlign: 'right' }) ? 'right' : editor.isActive({ textAlign: 'center' }) ? 'center' : 'justify'} p-0 border-0`"></i>
                    <i :class="`fa-solid fa-chevron-${openAlignment ? 'up' : 'down'} p-0 border-0`"></i>
                </div>
                <div v-if="openAlignment" class="menu-butn">
                    <span class="head-text text-uppercase justify-content-start">Alignment</span>
                    <span @click="editor.chain().focus().setTextAlign('left').run()">
                        <i
                            :class="`fa-solid fa-check p-0 ${editor.isActive({ textAlign: 'left' }) ? 'visible' : 'invisible'}`"></i>
                        <i class="fa-solid fa-align-left p-0"></i>
                        Align left
                    </span>
                    <span @click="editor.chain().focus().setTextAlign('right').run()">
                        <i
                            :class="`fa-solid fa-check p-0 ${editor.isActive({ textAlign: 'right' }) ? 'visible' : 'invisible'}`"></i>
                        <i class="fa-solid fa-align-right p-0"></i>
                        Align Right
                    </span>
                    <span @click="editor.chain().focus().setTextAlign('center').run()">
                        <i
                            :class="`fa-solid fa-check p-0 ${editor.isActive({ textAlign: 'center' }) ? 'visible' : 'invisible'}`"></i>
                        <i class="fa-solid fa-align-center p-0"></i>
                        Align center
                    </span>
                    <span @click="editor.chain().focus().setTextAlign('justify').run()">
                        <i
                            :class="`fa-solid fa-check p-0 ${editor.isActive({ textAlign: 'justify' }) ? 'visible' : 'invisible'}`"></i>
                        <i class="fa-solid fa-align-justify p-0"></i>
                        Justify
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { useEditor, EditorContent, Editor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
// import Document from '@tiptap/extension-document'

const props = defineProps(['programDetails'])
const emit = defineEmits(['getData'])

const editor = new Editor({
    content: '',
    extensions: [
        StarterKit,
        // Document,
        Underline,
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        })
    ],
    onCreate: ({editor}) => {
        editor.commands.setContent(props.programDetails)
    },
    onUpdate: ({ editor }) => {
        emit('getData', editor.getText())
    }
})
const openAlignment = ref(false)


window.addEventListener("click", (e) => {
    if (e.target.classList[0] !== "aligning") {
        openAlignment.value = false
    }
});

</script>
<style lang="scss" scoped>
.desc-cont {
    transition: 0.2s;
    border: 1px solid transparent;
    background-color: var(--offwhite-color);

    .options {
        width: 100%;
        border-top: 1px solid var(--gray-color);

        .group-1,
        .group-2 {
            border-right: 1px solid var(--gray-color);

            i {
                cursor: pointer;
            }
        }

        .group-3 {
            .aligning {
                cursor: pointer;
                transition: 0.2s;
                border: 1px solid transparent;
                border-radius: 5px;
                padding: 10px 13px;

                &:hover {
                    border-color: var(--main-color);
                }

                i {
                    pointer-events: none;
                }
            }
        }

        i {
            transition: 0.2s;
            border: 1px solid transparent;
            border-radius: 5px;
            padding: 10px 13px;

            &:hover {
                border-color: var(--main-color);
            }

            &.active {
                background-color: #dc3545;
                color: var(--white-color);
            }
        }
    }

    .menu-butn {
        position: absolute;
        padding: 5px 0;
        background-color: var(--white-color);
        box-shadow: 0 8px 8px rgba(0, 0, 0, 25%);
        border-radius: 5px;
        left: 0;
        bottom: 50px;
        z-index: 55555555;

        .head-text {
            cursor: initial;

            &:hover {
                color: var(--black-color);
                background: none;
            }
        }

        span {
            display: flex;
            color: var(--black-color);
            align-items: center;
            padding: 5px 20px;
            gap: 10px;
            transition: 0.2s;
            white-space: nowrap;
            cursor: pointer;

            i {
                transition: 0.2s;
            }

            &:hover {
                background-color: #dc3545;
                color: var(--white-color);

                i {
                    color: var(--white-color);
                }
            }
        }
    }
}
</style>