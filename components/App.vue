<template>

    <div class="container">
    <div class="push-down"></div>
    <div class="col-md-8 col-md-offset-2">
            <div class="panel">
                <div class="panel-heading">
                    messages
                </div>
                <div class="panel-body">
                    
                </div>
                <div class="panel-footer">
                    
                </div>
            </div>
    </div>
</div>

</template>
<script>

export default {
    mounted(){
        this.auth.state({
            forward: '/app',
            redirect: '/login',
            then: (user) => {
                console.log("Logged in")
            }
        })
    },
    firebase(){
        messages:
    }
    data(){
        return {
            message: "welcome"
        }
    }
}
</script>

<style>
	
</style>