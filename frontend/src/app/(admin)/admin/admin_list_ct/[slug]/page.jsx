function edit_ct() {
    return ( 
        <div className="text-black">
        <div className="font-bold text-3xl mb-2">
            # ídfdshf932dfa
        </div>
        <div className="bg-white w-full p-4 rounded-lg">
            <form>
                <div className="sm:col-span-3 mb-4">
                    <label htmlFor="name_ct" className="block text-sm font-medium leading-6 text-gray-900">
                        Name category
                    </label>
                    <div className="mt-2">
                        <input
                            id="name_ct"
                            name="name_ct"
                            type="text"
                            className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="sm:col-span-3 mb-4">
                    <label htmlFor="tag_ct" className="block text-sm font-medium leading-6 text-gray-900">
                        Tag category
                    </label>
                    <div className="mt-2">
                        <input
                            id="tag_ct"
                            name="tag_ct"
                            type="text"
                            className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>


                <div className="mb-4">
                    <label htmlFor="formFileMultiple" className="block text-sm font-medium leading-6 text-gray-900 mb-2">Image category</label>
                    <input className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white" type="file" id="formFileMultiple" multiple />
                </div>

                <div>
                    <button className='w-full py-3 bg-primary rounded-lg font-semibold text-white hover:bg-orange-300'>Add</button>
                </div>
            </form>
        </div>
    </div>
     );
}

export default edit_ct;